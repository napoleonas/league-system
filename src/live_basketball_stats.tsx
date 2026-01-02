            <div className="text-center">
              <div className="text-white text-lg mb-2">{liveStats.quarter} KĖLINYS</div>
              <input
                type="text"
                value={liveStats.time}
                onChange={(e) => updateGameTime(e.target.value)}
                className="text-5xl font-bold bg-transparent text-white text-center w-32 border-b-2 border-white/30 focus:border-white focus:outline-none"
              />
              <div className="mt-3 flex gap-2 justify-center">
                <button onClick={toggleLive} className={`px-4 py-2 rounded-lg font-semibold transition ${liveStats.isLive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                  {liveStats.isLive ? 'PAUZA' : 'START'}
                </button>
                <button onClick={endGame} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition">
                  BAIGTI
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-2">{liveGame.away.logo}</div>
              <h3 className="text-2xl font-bold text-white">{liveGame.away.name}</h3>
              <div className="text-6xl font-bold text-blue-400 mt-2">{liveStats.awayScore}</div>
            </div>
          </div>
          
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4].map(q => (
              <button
                key={q}
                onClick={() => changeQuarter(q)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${liveStats.quarter === q ? 'bg-white text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
              >
                {q}K
              </button>
            ))}
          </div>
        </div>

        {/* Player Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Home Team */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">{liveGame.home.logo}</span>
              {liveGame.home.name}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pasirinkite žaidėją</label>
              <select
                value={selectedHomePlayer}
                onChange={(e) => setSelectedHomePlayer(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {homePlayers.map(p => (
                  <option key={p.id} value={p.id}>#{p.number} {p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={() => addLiveScore('home', selectedHomePlayer, 2, '2pt')} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition">
                  +2 Pataikė
                </button>
                <button onClick={() => addLiveMiss('home', selectedHomePlayer, '2pt')} className="flex-1 bg-green-200 hover:bg-green-300 text-green-800 py-3 rounded-lg font-semibold transition">
                  2pt Nepataikė
                </button>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => addLiveScore('home', selectedHomePlayer, 3, '3pt')} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
                  +3 Pataikė
                </button>
                <button onClick={() => addLiveMiss('home', selectedHomePlayer, '3pt')} className="flex-1 bg-green-200 hover:bg-green-300 text-green-800 py-3 rounded-lg font-semibold transition">
                  3pt Nepataikė
                </button>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => addLiveScore('home', selectedHomePlayer, 1, 'ft')} className="flex-1 bg-green-400 hover:bg-green-500 text-white py-3 rounded-lg font-semibold transition">
                  +1 Baudos
                </button>
                <button onClick={() => addLiveMiss('home', selectedHomePlayer, 'ft')} className="flex-1 bg-green-200 hover:bg-green-300 text-green-800 py-3 rounded-lg font-semibold transition">
                  Baudos nepataikė
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <button onClick={() => addLiveStat('home', selectedHomePlayer, 'rebounds')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Kamuolys
                </button>
                <button onClick={() => addLiveStat('home', selectedHomePlayer, 'assists')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Perdavimas
                </button>
                <button onClick={() => addLiveStat('home', selectedHomePlayer, 'steals')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Perėmimas
                </button>
                <button onClick={() => addLiveStat('home', selectedHomePlayer, 'blocks')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Blokavimas
                </button>
                <button onClick={() => addLiveStat('home', selectedHomePlayer, 'turnovers')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Klaida
                </button>
                <button onClick={() => addLiveStat('home', selectedHomePlayer, 'fouls')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Pražanga
                </button>
              </div>
            </div>

            {/* Home Players Stats */}
            <div className="mt-6">
              <h4 className="font-bold text-gray-800 mb-3">Komandos statistika</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {homePlayers.map(player => {
                  const stats = liveStats.homePlayers[player.id];
                  if (!stats || stats.points === 0) return null;
                  return (
                    <div key={player.id} className="bg-gray-50 rounded p-2 text-sm">
                      <div className="font-semibold text-gray-800">#{player.number} {player.name}</div>
                      <div className="text-gray-600">
                        {stats.points} tšk, {stats.rebounds} atk, {stats.assists} rez.p., {stats.fouls} praž.
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Away Team */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">{liveGame.away.logo}</span>
              {liveGame.away.name}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pasirinkite žaidėją</label>
              <select
                value={selectedAwayPlayer}
                onChange={(e) => setSelectedAwayPlayer(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {awayPlayers.map(p => (
                  <option key={p.id} value={p.id}>#{p.number} {p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={() => addLiveScore('away', selectedAwayPlayer, 2, '2pt')} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition">
                  +2 Pataikė
                </button>
                <button onClick={() => addLiveMiss('away', selectedAwayPlayer, '2pt')} className="flex-1 bg-blue-200 hover:bg-blue-300 text-blue-800 py-3 rounded-lg font-semibold transition">
                  2pt Nepataikė
                </button>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => addLiveScore('away', selectedAwayPlayer, 3, '3pt')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                  +3 Pataikė
                </button>
                <button onClick={() => addLiveMiss('away', selectedAwayPlayer, '3pt')} className="flex-1 bg-blue-200 hover:bg-blue-300 text-blue-800 py-3 rounded-lg font-semibold transition">
                  3pt Nepataikė
                </button>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => addLiveScore('away', selectedAwayPlayer, 1, 'ft')} className="flex-1 bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition">
                  +1 Baudos
                </button>
                <button onClick={() => addLiveMiss('away', selectedAwayPlayer, 'ft')} className="flex-1 bg-blue-200 hover:bg-blue-300 text-blue-800 py-3 rounded-lg font-semibold transition">
                  Baudos nepataikė
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <button onClick={() => addLiveStat('away', selectedAwayPlayer, 'rebounds')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Kamuolys
                </button>
                <button onClick={() => addLiveStat('away', selectedAwayPlayer, 'assists')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Perdavimas
                </button>
                <button onClick={() => addLiveStat('away', selectedAwayPlayer, 'steals')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Perėmimas
                </button>
                <button onClick={() => addLiveStat('away', selectedAwayPlayer, 'blocks')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Blokavimas
                </button>
                <button onClick={() => addLiveStat('away', selectedAwayPlayer, 'turnovers')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Klaida
                </button>
                <button onClick={() => addLiveStat('away', selectedAwayPlayer, 'fouls')} className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-semibold transition">
                  Pražanga
                </button>
              </div>
            </div>

            {/* Away Players Stats */}
            <div className="mt-6">
              <h4 className="font-bold text-gray-800 mb-3">Komandos statistika</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {awayPlayers.map(player => {
                  const stats = liveStats.awayPlayers[player.id];
                  if (!stats || stats.points === 0) return null;
                  return (
                    <div key={player.id} className="bg-gray-50 rounded p-2 text-sm">
                      <div className="font-semibold text-gray-800">#{player.number} {player.name}</div>
                      <div className="text-gray-600">
                        {stats.points} tšk, {stats.rebounds} atk, {stats.assists} rez.p., {stats.fouls} praž.
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Events Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Įvykių chronologija</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {liveStats.events.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Dar nėra įvykių</p>
            ) : (
              liveStats.events.map(event => (
                <div key={event.id} className={`flex items-center gap-4 p-3 rounded-lg ${event.team === 'home' ? 'bg-green-50' : 'bg-blue-50'}`}>
                  <span className="text-sm font-semibold text-gray-600 w-20">{event.quarter}K {event.time}</span>
                  <span className="text-2xl">{event.team === 'home' ? liveGame.home.logo : liveGame.away.logo}</span>
                  <span className="font-semibold">{event.player}</span>
                  <span className="text-gray-700">{event.action}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const TeamsPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">LKL Komandos</h2>
          {isLoggedIn && userRole === 'admin' && (
            <button onClick={handleAddTeam} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition">
              <Plus size={20} /> Pridėti
            </button>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <div key={team.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <div className="absolute bottom-4 left-4">
                  <span className="text-6xl">{team.logo}</span>
                </div>
                {isLoggedIn && userRole === 'admin' && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={() => handleEditTeam(team)} className="p-2 bg-white/90 hover:bg-white text-blue-600 rounded-lg transition">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDeleteTeam(team.id)} className="p-2 bg-white/90 hover:bg-white text-red-600 rounded-lg transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{team.name}</h3>
                <p className="text-gray-500 mb-4 flex items-center gap-1">
                  <MapPin size={16} />
                  {team.city}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{team.wins}</div>
                    <div className="text-xs text-gray-500">Pergalės</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-600">{team.losses}</div>
                    <div className="text-xs text-gray-500">Pralaimėjimai</div>
                  </div>
                </div>
                <button onClick={() => { setSelectedTeam(team); setCurrentPage('teamDetail'); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                  Plačiau
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TeamDetailPage = () => {
    if (!selectedTeam) return null;
    const teamPlayers = players.filter(p => p.teamId === selectedTeam.id);
    
    return (
      <div className="space-y-6">
        <button onClick={() => setCurrentPage('teams')} className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
          <ChevronRight size={20} className="rotate-180" />
          Grįžti į komandas
        </button>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-48 bg-gradient-to-br relative" style={{ background: `linear-gradient(135deg, ${selectedTeam.colors[0]} 0%, ${selectedTeam.colors[1]} 100%)` }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-9xl opacity-30">{selectedTeam.logo}</div>
            </div>
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-4xl font-bold mb-2">{selectedTeam.name}</h2>
              <p className="text-xl opacity-90">{selectedTeam.city}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Įkurta</div>
                <div className="text-2xl font-bold text-gray-800">{selectedTeam.founded}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Arena</div>
                <div className="text-lg font-bold text-gray-800">{selectedTeam.arena}</div>
                <div className="text-sm text-gray-500">{selectedTeam.capacity.toLocaleString()} vietų</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Vyr. treneris</div>
                <div className="text-lg font-bold text-gray-800">{selectedTeam.coach}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{selectedTeam.wins}</div>
                <div className="text-sm text-gray-600">Pergalės</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-600">{selectedTeam.losses}</div>
                <div className="text-sm text-gray-600">Pralaimėjimai</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">{((selectedTeam.wins / (selectedTeam.wins + selectedTeam.losses)) * 100).toFixed(0)}%</div>
                <div className="text-sm text-gray-600">Laimėjimų %</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-yellow-600">{selectedTeam.titles}</div>
                <div className="text-sm text-gray-600">Titulai</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Apie komandą</h3>
              <p className="text-gray-600">{selectedTeam.description}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Sudėtis</h3>
                {isLoggedIn && userRole === 'admin' && (
                  <button onClick={() => handleAddPlayer(selectedTeam.id)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition">
                    <Plus size={16} /> Pridėti žaidėją
                  </button>
                )}
              </div>
              
              {teamPlayers.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {teamPlayers.map(player => (
                    <div key={player.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                            {player.nationality}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{player.name}</h4>
                            <p className="text-sm text-gray-500">{player.position} • #{player.number}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{player.height} cm</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">{player.ppg}</div>
                          <div className="text-xs text-gray-500">PPG</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{player.rpg}</div>
                          <div className="text-xs text-gray-500">RPG</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{player.apg}</div>
                          <div className="text-xs text-gray-500">APG</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Sudėtis dar neįvesta</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StandingsPage = () => {
    const sortedTeams = [...teams].sort((a, b) => b.wins - a.wins);
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Trophy size={32} className="text-yellow-500" />
          Turnyro lentelė 2025-2026
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 bg-gray-50">
                <th className="text-left py-4 px-4 font-bold text-gray-700">#</th>
                <th className="text-left py-4 px-4 font-bold text-gray-700">Komanda</th>
                <th className="text-center py-4 px-2 font-bold text-gray-700">Pergalės</th>
                <th className="text-center py-4 px-2 font-bold text-gray-700">Pralaimėjimai</th>
                <th className="text-center py-4 px-2 font-bold text-gray-700">%</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, idx) => {
                const totalGames = team.wins + team.losses;
                const winPct = ((team.wins / totalGames) * 100).toFixed(1);
                
                return (
                  <tr key={team.id} className={`border-b border-gray-100 hover:bg-gray-50 transition ${idx < 4 ? 'bg-green-50' : ''}`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-700">{idx + 1}</span>
                        {idx < 4 && <Shield size={16} className="text-green-600" />}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button onClick={() => { setSelectedTeam(team); setCurrentPage('teamDetail'); }} className="flex items-center gap-3 hover:text-blue-600 transition">
                        <span className="text-3xl">{team.logo}</span>
                        <div className="text-left">
                          <div className="font-bold text-gray-800">{team.name}</div>
                          <div className="text-sm text-gray-500">{team.city}</div>
                        </div>
                      </button>
                    </td>
                    <td className="text-center py-4 px-2 font-semibold text-green-600">{team.wins}</td>
                    <td className="text-center py-4 px-2 font-semibold text-red-600">{team.losses}</td>
                    <td className="text-center py-4 px-2 font-semibold text-blue-600">{winPct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'standings' && <StandingsPage />}
        {currentPage === 'teams' && <TeamsPage />}
        {currentPage === 'teamDetail' && <TeamDetailPage />}
        {currentPage === 'players' && <PlayersPage />}
        {currentPage === 'playerDetail' && <PlayerDetailPage />}
        {currentPage === 'news' && <NewsPage />}
        {currentPage === 'admin' && <AdminPage />}
        {currentPage === 'statsPanel' && <StatsPanelPage />}
      </main>

      {showLogin && <LoginModal />}
      {editMode && <EditModal />}

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Calendar, Trophy, Users, TrendingUp, Play, Clock, MapPin, ChevronRight, Star, Target, Award, BarChart3, User, Shield, LogIn, LogOut, Edit, Trash2, Plus, Save, Upload, FileText, Settings, Activity } from 'lucide-react';

// PRADINIS DUOMENŲ NUSTATYMAS
const initialTeams = [
  { id: 1, name: 'Žalgiris', city: 'Kaunas', logo: '🟢', colors: ['#00A651', '#FFFFFF'], founded: 1944, arena: 'Žalgirio Arena', capacity: 15415, coach: 'Andrea Trinchieri', wins: 12, losses: 3, points: 1245, titles: 22, description: 'Vienas titulųčiausių Lietuvos klubų' },
  { id: 2, name: 'Rytas', city: 'Vilnius', logo: '🔵', colors: ['#0066CC', '#FFFFFF'], founded: 1997, arena: 'Jeep Arena', capacity: 2500, coach: 'Alessandro Magro', wins: 11, losses: 4, points: 1198, titles: 5, description: 'Sostinės krepšinio grandis' },
  { id: 3, name: 'Lietkabelis', city: 'Panevėžys', logo: '🟡', colors: ['#FFD700', '#000000'], founded: 1964, arena: 'Kalnapilio Arena', capacity: 5800, coach: 'Nenad Čanak', wins: 10, losses: 5, points: 1167, titles: 2, description: 'Dinamiškas klubas' },
];

const initialPlayers = [
  { id: 1, teamId: 1, name: 'Lukas Lekavičius', number: 11, position: 'PG', height: 180, weight: 82, birthDate: '1994-11-28', nationality: '🇱🇹', ppg: 12.5, apg: 5.8, rpg: 2.3, spg: 1.2, bpg: 0.1, fgPct: 45.2, threePct: 38.5, ftPct: 87.3, photo: '', bio: 'Patyręs įžaidėjas su puikiu žaidimo skaitymu' },
  { id: 2, teamId: 1, name: 'Brady Manek', number: 45, position: 'PF', height: 206, weight: 102, birthDate: '1997-09-04', nationality: '🇺🇸', ppg: 14.2, apg: 1.2, rpg: 6.5, spg: 0.8, bpg: 0.9, fgPct: 48.1, threePct: 41.2, ftPct: 82.5, photo: '', bio: 'Versatilus puolėjas su geru metimu' },
];

const initialNews = [
  { id: 1, title: 'Žalgiris iškovojo dramašką pergalę prieš Rytą', content: 'Kauno Žalgiris po atkaklios kovos 89:85 įveikė Vilniaus Rytą ir sustiprino savo pozicijas turnyro viršūnėje...', date: '2026-01-02', author: 'LKL Redakcija', category: 'Rungtynės', image: '' },
  { id: 2, title: 'Lietkabelis pratęsė sutartį su vyr. treneriu', content: 'Panevėžio Lietkabelis pratęsė sutartį su vyriausiuoju treneriu Nenadu Čanaku dar dvejiems metams...', date: '2026-01-01', author: 'LKL Redakcija', category: 'Naujienos', image: '' },
];

export default function LKLSystem() {
  // AUTHENTICATION STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'stats'
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // DATA STATE
  const [teams, setTeams] = useState(initialTeams);
  const [players, setPlayers] = useState(initialPlayers);
  const [news, setNews] = useState(initialNews);

  // PAGE STATE
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ADMIN STATE
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  // LIVE STATS STATE
  const [liveGame, setLiveGame] = useState(null);
  const [liveStats, setLiveStats] = useState({
    homeScore: 0,
    awayScore: 0,
    quarter: 1,
    time: '10:00',
    isLive: false,
    homePlayers: {},
    awayPlayers: {},
    events: []
  });

  // LOGIN HANDLER
  const handleLogin = () => {
    // Demo credentials
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
      setUserRole('admin');
      setShowLogin(false);
      alert('Prisijungėte kaip Administratorius');
    } else if (loginForm.username === 'stats' && loginForm.password === 'stats123') {
      setIsLoggedIn(true);
      setUserRole('stats');
      setShowLogin(false);
      alert('Prisijungėte kaip Statistikas');
    } else {
      alert('Neteisingi prisijungimo duomenys. Bandykite: admin/admin123 arba stats/stats123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentPage('home');
    setEditMode(false);
  };

  // CRUD OPERATIONS
  const handleAddTeam = () => {
    const newTeam = {
      id: teams.length + 1,
      name: 'Nauja komanda',
      city: 'Miestas',
      logo: '⚪',
      colors: ['#000000', '#FFFFFF'],
      founded: 2026,
      arena: 'Arena',
      capacity: 1000,
      coach: 'Treneris',
      wins: 0,
      losses: 0,
      points: 0,
      titles: 0,
      description: 'Aprašymas'
    };
    setTeams([...teams, newTeam]);
    setEditingItem(newTeam);
    setEditForm(newTeam);
    setEditMode(true);
  };

  const handleEditTeam = (team) => {
    setEditingItem(team);
    setEditForm(team);
    setEditMode(true);
  };

  const handleSaveTeam = () => {
    setTeams(teams.map(t => t.id === editForm.id ? editForm : t));
    setEditMode(false);
    setEditingItem(null);
    alert('Komanda išsaugota!');
  };

  const handleDeleteTeam = (id) => {
    if (confirm('Ar tikrai norite ištrinti šią komandą?')) {
      setTeams(teams.filter(t => t.id !== id));
      alert('Komanda ištrinta!');
    }
  };

  const handleAddPlayer = (teamId) => {
    const newPlayer = {
      id: players.length + 1,
      teamId: teamId,
      name: 'Naujas žaidėjas',
      number: 0,
      position: 'PG',
      height: 190,
      weight: 85,
      birthDate: '2000-01-01',
      nationality: '🇱🇹',
      ppg: 0,
      apg: 0,
      rpg: 0,
      spg: 0,
      bpg: 0,
      fgPct: 0,
      threePct: 0,
      ftPct: 0,
      photo: '',
      bio: ''
    };
    setPlayers([...players, newPlayer]);
    setEditingItem(newPlayer);
    setEditForm(newPlayer);
    setEditMode(true);
  };

  const handleEditPlayer = (player) => {
    setEditingItem(player);
    setEditForm(player);
    setEditMode(true);
  };

  const handleSavePlayer = () => {
    setPlayers(players.map(p => p.id === editForm.id ? editForm : p));
    setEditMode(false);
    setEditingItem(null);
    alert('Žaidėjas išsaugotas!');
  };

  const handleDeletePlayer = (id) => {
    if (confirm('Ar tikrai norite ištrinti šį žaidėją?')) {
      setPlayers(players.filter(p => p.id !== id));
      alert('Žaidėjas ištrintas!');
    }
  };

  const handleAddNews = () => {
    const newNews = {
      id: news.length + 1,
      title: 'Nauja naujiena',
      content: 'Turinys...',
      date: new Date().toISOString().split('T')[0],
      author: 'LKL Redakcija',
      category: 'Naujienos',
      image: ''
    };
    setNews([newNews, ...news]);
    setEditingItem(newNews);
    setEditForm(newNews);
    setEditMode(true);
  };

  const handleEditNews = (newsItem) => {
    setEditingItem(newsItem);
    setEditForm(newsItem);
    setEditMode(true);
  };

  const handleSaveNews = () => {
    setNews(news.map(n => n.id === editForm.id ? editForm : n));
    setEditMode(false);
    setEditingItem(null);
    alert('Naujiena išsaugota!');
  };

  const handleDeleteNews = (id) => {
    if (confirm('Ar tikrai norite ištrinti šią naujiena?')) {
      setNews(news.filter(n => n.id !== id));
      alert('Naujiena ištrinta!');
    }
  };

  // LIVE STATS HANDLERS
  const startLiveGame = (homeTeamId, awayTeamId) => {
    const home = teams.find(t => t.id === homeTeamId);
    const away = teams.find(t => t.id === awayTeamId);
    const homePlayers = players.filter(p => p.teamId === homeTeamId);
    const awayPlayers = players.filter(p => p.teamId === awayTeamId);

    setLiveGame({ home, away });
    setLiveStats({
      homeScore: 0,
      awayScore: 0,
      quarter: 1,
      time: '10:00',
      isLive: true,
      homePlayers: Object.fromEntries(homePlayers.map(p => [p.id, { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, turnovers: 0, fouls: 0, fieldGoals: { made: 0, attempted: 0 }, threePointers: { made: 0, attempted: 0 }, freeThrows: { made: 0, attempted: 0 } }])),
      awayPlayers: Object.fromEntries(awayPlayers.map(p => [p.id, { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, turnovers: 0, fouls: 0, fieldGoals: { made: 0, attempted: 0 }, threePointers: { made: 0, attempted: 0 }, freeThrows: { made: 0, attempted: 0 } }])),
      events: []
    });
    setCurrentPage('liveStats');
  };

  const addLiveScore = (team, playerId, points, type) => {
    setLiveStats(prev => {
      const newStats = { ...prev };
      newStats[team === 'home' ? 'homeScore' : 'awayScore'] += points;
      
      const playerStats = newStats[team === 'home' ? 'homePlayers' : 'awayPlayers'][playerId];
      playerStats.points += points;
      
      if (type === '2pt') {
        playerStats.fieldGoals.made++;
        playerStats.fieldGoals.attempted++;
      } else if (type === '3pt') {
        playerStats.fieldGoals.made++;
        playerStats.fieldGoals.attempted++;
        playerStats.threePointers.made++;
        playerStats.threePointers.attempted++;
      } else if (type === 'ft') {
        playerStats.freeThrows.made++;
        playerStats.freeThrows.attempted++;
      }

      const player = players.find(p => p.id === playerId);
      newStats.events.unshift({
        id: Date.now(),
        quarter: prev.quarter,
        time: prev.time,
        team: team,
        player: player.name,
        action: `Pelnė ${points} tšk. (${type})`,
        type: 'score'
      });

      return newStats;
    });
  };

  const addLiveMiss = (team, playerId, type) => {
    setLiveStats(prev => {
      const newStats = { ...prev };
      const playerStats = newStats[team === 'home' ? 'homePlayers' : 'awayPlayers'][playerId];
      
      if (type === '2pt') {
        playerStats.fieldGoals.attempted++;
      } else if (type === '3pt') {
        playerStats.fieldGoals.attempted++;
        playerStats.threePointers.attempted++;
      } else if (type === 'ft') {
        playerStats.freeThrows.attempted++;
      }

      const player = players.find(p => p.id === playerId);
      newStats.events.unshift({
        id: Date.now(),
        quarter: prev.quarter,
        time: prev.time,
        team: team,
        player: player.name,
        action: `Nepataikė (${type})`,
        type: 'miss'
      });

      return newStats;
    });
  };

  const addLiveStat = (team, playerId, statType) => {
    setLiveStats(prev => {
      const newStats = { ...prev };
      const playerStats = newStats[team === 'home' ? 'homePlayers' : 'awayPlayers'][playerId];
      playerStats[statType]++;

      const player = players.find(p => p.id === playerId);
      const statNames = {
        rebounds: 'Atkovojo kamuolį',
        assists: 'Rezultatyvi perdavimas',
        steals: 'Perėmė kamuolį',
        blocks: 'Blokavo metimą',
        turnovers: 'Prarado kamuolį',
        fouls: 'Pražanga'
      };

      newStats.events.unshift({
        id: Date.now(),
        quarter: prev.quarter,
        time: prev.time,
        team: team,
        player: player.name,
        action: statNames[statType],
        type: statType
      });

      return newStats;
    });
  };

  const updateGameTime = (time) => {
    setLiveStats(prev => ({ ...prev, time }));
  };

  const changeQuarter = (quarter) => {
    setLiveStats(prev => ({ ...prev, quarter, time: '10:00' }));
  };

  const toggleLive = () => {
    setLiveStats(prev => ({ ...prev, isLive: !prev.isLive }));
  };

  const endGame = () => {
    if (confirm('Ar tikrai norite baigti rungtynes?')) {
      setLiveStats(prev => ({ ...prev, isLive: false }));
      alert('Rungtynės baigtos! Statistika išsaugota.');
    }
  };

  // HELPER FUNCTIONS
  const getTeamById = (id) => teams.find(t => t.id === id);
  const getPlayerById = (id) => players.find(p => p.id === id);

  // LOGIN MODAL
  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Prisijungimas prie LKL sistemos</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vartotojo vardas</label>
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Įveskite vartotojo vardą"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Slaptažodis</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Įveskite slaptažodį"
            />
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800"><strong>Demo prisijungimai:</strong></p>
            <p className="text-xs text-blue-700 mt-1">Administratorius: admin / admin123</p>
            <p className="text-xs text-blue-700">Statistikas: stats / stats123</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogin}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Prisijungti
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition"
            >
              Atšaukti
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // EDIT MODAL
  const EditModal = () => {
    if (!editMode || !editingItem) return null;

    const isTeam = editingItem.hasOwnProperty('arena');
    const isPlayer = editingItem.hasOwnProperty('position');
    const isNews = editingItem.hasOwnProperty('content');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 my-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isTeam ? 'Redaguoti komandą' : isPlayer ? 'Redaguoti žaidėją' : 'Redaguoti naujiena'}
          </h2>
          
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {isTeam && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pavadinimas</label>
                    <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Miestas</label>
                    <input type="text" value={editForm.city} onChange={(e) => setEditForm({...editForm, city: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Logo (emoji)</label>
                    <input type="text" value={editForm.logo} onChange={(e) => setEditForm({...editForm, logo: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Įkurta</label>
                    <input type="number" value={editForm.founded} onChange={(e) => setEditForm({...editForm, founded: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Arena</label>
                    <input type="text" value={editForm.arena} onChange={(e) => setEditForm({...editForm, arena: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Talpa</label>
                    <input type="number" value={editForm.capacity} onChange={(e) => setEditForm({...editForm, capacity: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vyr. treneris</label>
                    <input type="text" value={editForm.coach} onChange={(e) => setEditForm({...editForm, coach: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pergalės</label>
                    <input type="number" value={editForm.wins} onChange={(e) => setEditForm({...editForm, wins: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pralaimėjimai</label>
                    <input type="number" value={editForm.losses} onChange={(e) => setEditForm({...editForm, losses: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nuotrauka URL</label>
                  <input type="text" value={editForm.photo} onChange={(e) => setEditForm({...editForm, photo: e.target.value})} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </>
            )}

            {isNews && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Antraštė</label>
                  <input type="text" value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Turinys</label>
                  <textarea value={editForm.content} onChange={(e) => setEditForm({...editForm, content: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="6"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kategorija</label>
                    <select value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="Naujienos">Naujienos</option>
                      <option value="Rungtynės">Rungtynės</option>
                      <option value="Žaidėjai">Žaidėjai</option>
                      <option value="Interviu">Interviu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Autorius</label>
                    <input type="text" value={editForm.author} onChange={(e) => setEditForm({...editForm, author: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nuotrauka URL</label>
                  <input type="text" value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={isTeam ? handleSaveTeam : isPlayer ? handleSavePlayer : handleSaveNews} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
              <Save size={20} />
              Išsaugoti
            </button>
            <button onClick={() => { setEditMode(false); setEditingItem(null); }} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition">
              Atšaukti
            </button>
          </div>
        </div>
      </div>
    );
  };

  // NAVIGATION
  const Navigation = () => (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏀</div>
            <div>
              <h1 className="text-xl font-bold text-white">LKL</h1>
              <p className="text-xs text-blue-200">Lietuvos Krepšinio Lyga</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setCurrentPage('home')} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${currentPage === 'home' ? 'bg-white text-blue-900' : 'text-white hover:bg-blue-800'}`}>
              <Home size={18} /> Pradžia
            </button>
            <button onClick={() => setCurrentPage('standings')} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${currentPage === 'standings' ? 'bg-white text-blue-900' : 'text-white hover:bg-blue-800'}`}>
              <Trophy size={18} /> Lentelė
            </button>
            <button onClick={() => setCurrentPage('teams')} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${currentPage === 'teams' ? 'bg-white text-blue-900' : 'text-white hover:bg-blue-800'}`}>
              <Users size={18} /> Komandos
            </button>
            <button onClick={() => setCurrentPage('players')} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${currentPage === 'players' ? 'bg-white text-blue-900' : 'text-white hover:bg-blue-800'}`}>
              <User size={18} /> Žaidėjai
            </button>
            <button onClick={() => setCurrentPage('news')} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${currentPage === 'news' ? 'bg-white text-blue-900' : 'text-white hover:bg-blue-800'}`}>
              <FileText size={18} /> Naujienos
            </button>
            
            {isLoggedIn && (
              <>
                {userRole === 'admin' && (
                  <button onClick={() => setCurrentPage('admin')} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${currentPage === 'admin' ? 'bg-orange-500 text-white' : 'bg-orange-600 text-white hover:bg-orange-700'}`}>
                    <Settings size={18} /> Admin
                  </button>
                )}
                {(userRole === 'admin' || userRole === 'stats') && (
                  <button onClick={() => setCurrentPage('statsPanel')} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${currentPage === 'statsPanel' ? 'bg-green-500 text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                    <Activity size={18} /> Live Stats
                  </button>
                )}
              </>
            )}

            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-semibold">
                <LogOut size={18} /> Atsijungti
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition text-sm font-semibold">
                <LogIn size={18} /> Prisijungti
              </button>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-blue-800 rounded-lg">
              <Home size={18} /> Pradžia
            </button>
            <button onClick={() => { setCurrentPage('news'); setMobileMenuOpen(false); }} className="flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-blue-800 rounded-lg">
              <FileText size={18} /> Naujienos
            </button>
            {!isLoggedIn && (
              <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} className="flex items-center gap-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg">
                <LogIn size={18} /> Prisijungti
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  // PAGES
  const HomePage = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-xl p-8 text-white">
        <h2 className="text-4xl font-bold mb-2">LKL 2025-2026 Sezonas</h2>
        <p className="text-xl opacity-90">Geriausias krepšinis Lietuvoje</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {teams.slice(0, 3).map(team => (
          <div key={team.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <div className="text-5xl mb-3 text-center">{team.logo}</div>
            <h3 className="text-xl font-bold text-gray-800 text-center">{team.name}</h3>
            <p className="text-gray-500 text-center mb-4">{team.city}</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 rounded p-2 text-center">
                <div className="text-2xl font-bold text-green-600">{team.wins}</div>
                <div className="text-xs text-gray-500">Pergalės</div>
              </div>
              <div className="bg-red-50 rounded p-2 text-center">
                <div className="text-2xl font-bold text-red-600">{team.losses}</div>
                <div className="text-xs text-gray-500">Pralaimėjimai</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const NewsPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Naujienos</h2>
          {isLoggedIn && userRole === 'admin' && (
            <button onClick={handleAddNews} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition">
              <Plus size={20} /> Pridėti
            </button>
          )}
        </div>

        <div className="space-y-4">
          {news.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.category}</span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Autorius: {item.author}</span>
                    <button onClick={() => { setSelectedNews(item); setCurrentPage('newsDetail'); }} className="text-blue-600 hover:text-blue-700 font-semibold">
                      Skaityti daugiau →
                    </button>
                  </div>
                </div>
                
                {isLoggedIn && userRole === 'admin' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleEditNews(item)} className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteNews(item.id)} className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PlayersPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Visi žaidėjai</h2>
        
        {teams.map(team => {
          const teamPlayers = players.filter(p => p.teamId === team.id);
          if (teamPlayers.length === 0) return null;
          
          return (
            <div key={team.id} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{team.logo}</span>
                <h3 className="text-2xl font-bold text-gray-800">{team.name}</h3>
                {isLoggedIn && userRole === 'admin' && (
                  <button onClick={() => handleAddPlayer(team.id)} className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-semibold transition">
                    <Plus size={16} /> Pridėti žaidėją
