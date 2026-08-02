'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { PortalData, Disciplina, Serie, Bimestre } from '@/lib/dados';
import AbaDisciplina from '@/components/AbaDisciplina';
import CronogramaSemanal from '@/components/CronogramaSemanal';

export default function Home() {
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeDisc, setActiveDisc] = useState<string>('');
  const [activeSerie, setActiveSerie] = useState<string>('');
  const [activeBim, setActiveBim] = useState<number>(3);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/materiais')
      .then(res => res.json())
      .then(json => {
        if (json.error) throw new Error(json.error);
        setData(json);
        if (json.disciplinas.length > 0) {
          setActiveDisc(json.disciplinas[0].id);
          setActiveSerie(json.disciplinas[0].series[0].id);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="w-12 h-12 text-brand-medium animate-spin mb-4" />
      <p className="text-brand-dark font-medium">Carregando materiais...</p>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
      <p className="text-red-600 font-bold">Erro ao carregar dados</p>
      <p className="text-red-500 text-sm mt-2">{error}</p>
    </div>
  );

  const disciplina = data?.disciplinas.find(d => d.id === activeDisc);
  const serie = disciplina?.series.find(s => s.id === activeSerie);
  const bimestre = serie?.bimestres.find(b => b.id === activeBim);

  return (
    <div className="space-y-8">
      {/* Navegação de Disciplinas */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {data?.disciplinas.map(d => (
          <button
            key={d.id}
            onClick={() => {
              setActiveDisc(d.id);
              setActiveSerie(d.series[0].id);
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeDisc === d.id 
                ? 'bg-brand-dark text-white shadow-md' 
                : 'bg-white text-brand-medium hover:bg-gray-100'
            }`}
          >
            {d.nome}
          </button>
        ))}
      </div>

      {/* Filtros Secundários */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label className="block text-sm font-bold text-brand-dark mb-2">Série/Ano</label>
          <select 
            value={activeSerie}
            onChange={(e) => setActiveSerie(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-brand-light outline-none"
          >
            {disciplina?.series.map(s => (
              <option key={s.id} value={s.id}>{s.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-brand-dark mb-2">Bimestre</label>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => setActiveBim(num)}
                className={`w-10 h-10 rounded-full font-bold transition-all ${
                  activeBim === num 
                    ? 'bg-brand-medium text-white' 
                    : 'bg-white border border-gray-300 text-gray-500 hover:border-brand-medium'
                }`}
              >
                {num}º
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-brand-dark mb-2">Buscar</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar material..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-brand-light outline-none"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      {disciplina && serie && bimestre && (
        <div className="space-y-8">
          <AbaDisciplina 
            disciplina={disciplina} 
            serie={serie} 
            bimestre={bimestre} 
            search={search} 
          />
          <CronogramaSemanal 
            disciplina={disciplina} 
            serie={serie} 
            bimestre={bimestre} 
          />
        </div>
      )}
    </div>
  );
}
