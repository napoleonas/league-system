import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Download, Users, TrendingUp } from 'lucide-react';

export default function LiveBasketballStats() {
  const [game, setGame] = useState({
    id: 'game_' + Date.now(),
    homeTeam: 'Žalgiris',
    awayTeam: 'Rytas',
    homeScore: 0,
    awayScore: 0,
    quarter: 1,
    time: '10:00',
    isLive: false,
    startTime: new Date().toISOString()
  });

  const [stats, setStats] = useState({
    home: {
      fieldGoals: { made: 0, attempted: 0 },
      threePointers: { made: 0, attempted: 0 },
      freeThrows: { made: 0, attempted: 0 },
      rebounds: { offensive: 0, defensive: 0 },
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0
    },
    away: {
      fieldGoals: { made: 0, attempted: 0 },
      threePointers: { made: 0, attempted: 0 },
      freeThrows: { made: 0, attempted: 0 },
      rebounds: { offensive: 0, defensive: 0 },
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0
    }
  });

  const [events, setEvents] = useState([]);
  const [apiEndpoint, setApiEndpoint] = useState('');

  useEffect(() => {
    // Simuliuojame API endpoint
    const endpoint = `https://api.krepsinis.lt/v1/games/${game.id}/live`;
    setApiEndpoint(endpoint);
  }, [game.id]);

  const toggleLive = () => {
    setGame(prev => ({ ...prev, isLive: !prev.isLive }));
  };

  const addScore = (team, points, type) => {
    setGame(prev => ({
      ...prev,
      [team === 'home' ? 'homeScore' : 'awayScore']: prev[team === 'home' ? 'homeScore' : 'awayScore'] + points
    }));

    setStats(prev => {
      const newStats = { ...prev };
      const teamStats = newStats[team];

      if (type === '2pt') {
        teamStats.fieldGoals.made++;
        teamStats.fieldGoals.attempted++;
      } else if (type === '3pt') {
        teamStats.threePointers.made++;
        teamStats.threePointers.attempted++;
        teamStats.fieldGoals.made++;
        teamStats.fieldGoals.attempted++;
      } else if (type === 'ft') {
        teamStats.freeThrows.made++;
        teamStats.freeThrows.attempted++;
      }

      return newStats;
    });

    addEvent(team, `${points} taškas (-ai)`, type);
  };

  const addMiss = (team, type) => {
    setStats(prev => {
      const newStats = { ...prev };
      const teamStats = newStats[team];

      if (type === '2pt' || type === '3pt') {
        teamStats.fieldGoals.attempted++;
        if (type === '3pt') teamStats.threePointers.attempted++;
      } else if (type === 'ft') {
        teamStats.freeThrows.attempted++;
      }

      return newStats;
    });

    addEvent(team, 'Nepataikyta', type);
  };

  const addStat = (team, statType) => {
    setStats(prev => {
      const newStats = { ...prev };
      const teamStats = newStats[team];

      if (statType === 'offReb' || statType === 'defReb') {
        const rebType = statType === 'offReb' ? 'offensive' : 'defensive';
        teamStats.rebounds[rebType]++;
      } else {
        teamStats[statType]++;
      }

      return newStats;
    });

    const statNames = {
      assists: 'Rezultatyvi perdavimas',
      steals: 'Perėmimas',
      blocks: 'Blokavimas',
      turnovers: 'Klaida',
      fouls: 'Pražanga',
      offReb: 'Puolimo kamuolys',
      defReb: 'Gynybos kamuolys'
    };

    addEvent(team, statNames[statType], 'stat');
  };

  const addEvent = (team, action, type) => {
    const event = {
      id: Date.now(),
      time: game.time,
      quarter: game.quarter,
      team: team === 'home' ? game.homeTeam : game.awayTeam,
      action,
      type,
      timestamp: new Date().toISOString()
    };
    setEvents(prev => [event, ...prev].slice(0, 50));
  };

  const resetGame = () => {
    if (confirm('Ar tikrai norite atstatyti rungtynes?')) {
      setGame(prev => ({
        ...prev,
        homeScore: 0,
        awayScore: 0,
        quarter: 1,
        time: '10:00',
        isLive: false
      }));
      setStats({
        home: {
          fieldGoals: { made: 0, attempted: 0 },
          threePointers: { made: 0, attempted: 0 },
          freeThrows: { made: 0, attempted: 0 },
          rebounds: { offensive: 0, defensive: 0 },
          assists: 0,
          steals: 0,
          blocks: 0,
          turnovers: 0,
          fouls: 0
        },
        away: {
          fieldGoals: { made: 0, attempted: 0 },
          threePointers: { made: 0, attempted: 0 },
          freeThrows: { made: 0, attempted: 0 },
          rebounds: { offensive: 0, defensive: 0 },
          assists: 0,
          steals: 0,
          blocks: 0,
          turnovers: 0,
          fouls: 0
        }
      });
      setEvents([]);
    }
  };

  const getApiData = () => {
    return {
      game: {
        id: game.id,
        status: game.isLive ? 'live' : 'scheduled',
        homeTeam: {
          name: game.homeTeam,
          score: game.homeScore,
          stats: stats.home
        },
        awayTeam: {
          name: game.awayTeam,
          score: game.awayScore,
          stats: stats.away
        },
        quarter: game.quarter,
        time: game.time,
        lastUpdate: new Date().toISOString()
      },
      events: events.slice(0, 10)
    };
  };

  const downloadJson = () => {
    const data = getApiData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `game_${game.id}_stats.json`;
    a.click();
  };

  const calcPercentage = (made, attempted) => {
    return attempted > 0 ? ((made / attempted) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Live Krepšinio Statistika</h1>
            <div className="flex gap-2">
              <button
                onClick={toggleLive}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  game.isLive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {game.isLive ? <Pause size={20} /> : <Play size={20} />}
                {game.isLive ? 'LIVE' : 'Pradėti'}
              </button>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Score */}
          <div className="grid grid-cols-3 gap-4 items-center text-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{game.homeTeam}</h2>
              <div className="text-6xl font-bold text-orange-600 mt-2">{game.homeScore}</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-semibold text-gray-600">Kėlinys {game.quarter}</div>
              <div className="text-3xl font-bold text-gray-800">{game.time}</div>
              {game.isLive && (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-semibold">TIESIOGINĖ TRANSLIACIJA</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{game.awayTeam}</h2>
              <div className="text-6xl font-bold text-blue-600 mt-2">{game.awayScore}</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Home Team Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-orange-600 mb-4">{game.homeTeam} - Valdymas</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={() => addScore('home', 2, '2pt')} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
                  +2 Pataikyta
                </button>
                <button onClick={() => addMiss('home', '2pt')} className="flex-1 bg-orange-200 hover:bg-orange-300 text-orange-800 py-3 rounded-lg font-semibold transition">
                  2pt Nepataikyta
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addScore('home', 3, '3pt')} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition">
                  +3 Pataikyta
                </button>
                <button onClick={() => addMiss('home', '3pt')} className="flex-1 bg-orange-200 hover:bg-orange-300 text-orange-800 py-3 rounded-lg font-semibold transition">
                  3pt Nepataikyta
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addScore('home', 1, 'ft')} className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-lg font-semibold transition">
                  +1 Baudos
                </button>
                <button onClick={() => addMiss('home', 'ft')} className="flex-1 bg-orange-200 hover:bg-orange-300 text-orange-800 py-3 rounded-lg font-semibold transition">
                  Baudos nepataikyta
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <button onClick={() => addStat('home', 'assists')} className="bg-orange-100 hover:bg-orange-200 text-orange-900 py-2 rounded-lg text-sm font-semibold transition">
                  Rez. perd.
                </button>
                <button onClick={() => addStat('home', 'steals')} className="bg-orange-100 hover:bg-orange-200 text-orange-900 py-2 rounded-lg text-sm font-semibold transition">
                  Perėmimas
                </button>
                <button onClick={() => addStat('home', 'blocks')} className="bg-orange-100 hover:bg-orange-200 text-orange-900 py-2 rounded-lg text-sm font-semibold transition">
                  Blokavimas
                </button>
                <button onClick={() => addStat('home', 'offReb')} className="bg-orange-100 hover:bg-orange-200 text-orange-900 py-2 rounded-lg text-sm font-semibold transition">
                  Puol. kam.
                </button>
                <button onClick={() => addStat('home', 'defReb')} className="bg-orange-100 hover:bg-orange-200 text-orange-900 py-2 rounded-lg text-sm font-semibold transition">
                  Gyn. kam.
                </button>
                <button onClick={() => addStat('home', 'turnovers')} className="bg-orange-100 hover:bg-orange-200 text-orange-900 py-2 rounded-lg text-sm font-semibold transition">
                  Klaida
                </button>
                <button onClick={() => addStat('home', 'fouls')} className="bg-orange-100 hover:bg-orange-200 text-orange-900 py-2 rounded-lg text-sm font-semibold transition col-span-3">
                  Pražanga
                </button>
              </div>
            </div>
          </div>

          {/* Away Team Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-4">{game.awayTeam} - Valdymas</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={() => addScore('away', 2, '2pt')} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition">
                  +2 Pataikyta
                </button>
                <button onClick={() => addMiss('away', '2pt')} className="flex-1 bg-blue-200 hover:bg-blue-300 text-blue-800 py-3 rounded-lg font-semibold transition">
                  2pt Nepataikyta
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addScore('away', 3, '3pt')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                  +3 Pataikyta
                </button>
                <button onClick={() => addMiss('away', '3pt')} className="flex-1 bg-blue-200 hover:bg-blue-300 text-blue-800 py-3 rounded-lg font-semibold transition">
                  3pt Nepataikyta
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addScore('away', 1, 'ft')} className="flex-1 bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition">
                  +1 Baudos
                </button>
                <button onClick={() => addMiss('away', 'ft')} className="flex-1 bg-blue-200 hover:bg-blue-300 text-blue-800 py-3 rounded-lg font-semibold transition">
                  Baudos nepataikyta
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <button onClick={() => addStat('away', 'assists')} className="bg-blue-100 hover:bg-blue-200 text-blue-900 py-2 rounded-lg text-sm font-semibold transition">
                  Rez. perd.
                </button>
                <button onClick={() => addStat('away', 'steals')} className="bg-blue-100 hover:bg-blue-200 text-blue-900 py-2 rounded-lg text-sm font-semibold transition">
                  Perėmimas
                </button>
                <button onClick={() => addStat('away', 'blocks')} className="bg-blue-100 hover:bg-blue-200 text-blue-900 py-2 rounded-lg text-sm font-semibold transition">
                  Blokavimas
                </button>
                <button onClick={() => addStat('away', 'offReb')} className="bg-blue-100 hover:bg-blue-200 text-blue-900 py-2 rounded-lg text-sm font-semibold transition">
                  Puol. kam.
                </button>
                <button onClick={() => addStat('away', 'defReb')} className="bg-blue-100 hover:bg-blue-200 text-blue-900 py-2 rounded-lg text-sm font-semibold transition">
                  Gyn. kam.
                </button>
                <button onClick={() => addStat('away', 'turnovers')} className="bg-blue-100 hover:bg-blue-200 text-blue-900 py-2 rounded-lg text-sm font-semibold transition">
                  Klaida
                </button>
                <button onClick={() => addStat('away', 'fouls')} className="bg-blue-100 hover:bg-blue-200 text-blue-900 py-2 rounded-lg text-sm font-semibold transition col-span-3">
                  Pražanga
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp size={24} />
            Detalės Statistika
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">{game.homeTeam}</th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-700">Statistika</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">{game.awayTeam}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-2 text-orange-600 font-semibold">
                    {stats.home.fieldGoals.made}/{stats.home.fieldGoals.attempted} ({calcPercentage(stats.home.fieldGoals.made, stats.home.fieldGoals.attempted)}%)
                  </td>
                  <td className="text-center py-3 px-2 text-gray-600">Metimų taiklumas</td>
                  <td className="py-3 px-2 text-right text-blue-600 font-semibold">
                    {stats.away.fieldGoals.made}/{stats.away.fieldGoals.attempted} ({calcPercentage(stats.away.fieldGoals.made, stats.away.fieldGoals.attempted)}%)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-orange-600 font-semibold">
                    {stats.home.threePointers.made}/{stats.home.threePointers.attempted} ({calcPercentage(stats.home.threePointers.made, stats.home.threePointers.attempted)}%)
                  </td>
                  <td className="text-center py-3 px-2 text-gray-600">3 taškų metimai</td>
                  <td className="py-3 px-2 text-right text-blue-600 font-semibold">
                    {stats.away.threePointers.made}/{stats.away.threePointers.attempted} ({calcPercentage(stats.away.threePointers.made, stats.away.threePointers.attempted)}%)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-orange-600 font-semibold">
                    {stats.home.freeThrows.made}/{stats.home.freeThrows.attempted} ({calcPercentage(stats.home.freeThrows.made, stats.home.freeThrows.attempted)}%)
                  </td>
                  <td className="text-center py-3 px-2 text-gray-600">Baudos metimai</td>
                  <td className="py-3 px-2 text-right text-blue-600 font-semibold">
                    {stats.away.freeThrows.made}/{stats.away.freeThrows.attempted} ({calcPercentage(stats.away.freeThrows.made, stats.away.freeThrows.attempted)}%)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-orange-600 font-semibold">
                    {stats.home.rebounds.offensive + stats.home.rebounds.defensive} ({stats.home.rebounds.offensive}+{stats.home.rebounds.defensive})
                  </td>
                  <td className="text-center py-3 px-2 text-gray-600">Atkovoti kamuoliai</td>
                  <td className="py-3 px-2 text-right text-blue-600 font-semibold">
                    {stats.away.rebounds.offensive + stats.away.rebounds.defensive} ({stats.away.rebounds.offensive}+{stats.away.rebounds.defensive})
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-orange-600 font-semibold">{stats.home.assists}</td>
                  <td className="text-center py-3 px-2 text-gray-600">Rezultatyvūs perdavimai</td>
                  <td className="py-3 px-2 text-right text-blue-600 font-semibold">{stats.away.assists}</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-orange-600 font-semibold">{stats.home.steals}</td>
                  <td className="text-center py-3 px-2 text-gray-600">Perėmimai</td>
                  <td className="py-3 px-2 text-right text-blue-600 font-semibold">{stats.away.steals}</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-orange-600 font-semibold">{stats.home.blocks}</td>
                  <td className="text-center py-3 px-2 text-gray-600">Blokavimai</td>
                  <td className="py-3 px-2 text-right text-blue-600 font-semibold">{stats.away.blocks}</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-orange-600 font-semibold">{stats.home.turnovers}</td>
                  <td className="text-center py-3 px-2 text-gray-600">Klaidos</td>
                  <td className="py-3 px-2 text-right text-blue-600 font-semibold">{stats.away.turnovers}</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-orange-600 font-semibold">{stats.home.fouls}</td>
                  <td className="text-center py-3 px-2 text-gray-600">Pražangos</td>
                  <td className="py-3 px-2 text-right text-blue-600 font-semibold">{stats.away.fouls}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* API Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users size={24} />
            API Integracija
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">API Endpoint (GET)</label>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm break-all">{apiEndpoint}</div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pavyzdinis JSON atsakymas</label>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs">
{JSON.stringify(getApiData(), null, 2)}
              </pre>
            </div>
            <button
              onClick={downloadJson}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              <Download size={20} />
              Parsisiųsti JSON
            </button>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Kaip naudoti:</strong> Kiti servisai (pvz. Sofascore) gali naudoti šį API endpoint realiu laiku gauti rungtynių statistiką. 
                Duomenys atsinaujina kiekvieną kartą, kai įvedama nauja statistika.
              </p>
            </div>
          </div>
        </div>

        {/* Events Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Įvykių Chronologija</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {events.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Dar nėra įvykių</p>
            ) : (
              events.map(event => (
                <div key={event.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="text-sm font-semibold text-gray-600 w-20">
                    {event.quarter}K {event.time}
                  </div>
                  <div className={`font-semibold w-32 ${event.team === game.homeTeam ? 'text-orange-600' : 'text-blue-600'}`}>
                    {event.team}
                  </div>
                  <div className="flex-1 text-gray-700">{event.action}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
