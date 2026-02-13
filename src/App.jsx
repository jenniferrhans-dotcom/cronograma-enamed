import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Circle, Calendar, BookOpen, Trophy, Info, ChevronDown, ChevronUp, Zap, LayoutGrid, ClipboardList, Target } from 'lucide-react';

const App = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedWeeks, setExpandedWeeks] = useState({ 1: true });

    const scheduleData = [
        { week: 1, phase: "Estudo Base", themes: [
            { area: "Clínica Médica", title: "Hipertensão Arterial Sistêmica", desc: "Diagnóstico, classificação e tratamento" },
            { area: "Pediatria", title: "Crescimento e desenvolvimento normal", desc: "Marcos do desenvolvimento e puericultura" }
        ]},
        { week: 2, phase: "Estudo Base", themes: [
            { area: "Cirurgia", title: "Abdome agudo", desc: "Diagnóstico diferencial e abordagem inicial" },
            { area: "Ginecologia/Obstetrícia", title: "Pré-natal de baixo risco", desc: "Consultas e exames de rotina" }
        ]},
        { week: 3, phase: "Estudo Base", themes: [
            { area: "Clínica Médica", title: "Diabetes Mellitus", desc: "Diagnóstico, complicações e tratamento" },
            { area: "MFC/Saúde Coletiva", title: "Rastreamento e prevenção", desc: "Câncer de mama, colo uterino e próstata" }
        ]},
        { week: 4, phase: "Estudo Base", themes: [
            { area: "Pediatria", title: "Doenças exantemáticas", desc: "Diagnóstico diferencial e conduta" },
            { area: "Cirurgia", title: "Trauma", desc: "ATLS e manejo inicial do politraumatizado" }
        ]},
        { week: 5, phase: "Estudo Base", themes: [
            { area: "Ginecologia/Obstetrícia", title: "Trabalho de parto e parto normal", desc: "Mecanismo e assistência" },
            { area: "Saúde Mental", title: "Transtornos de humor", desc: "Depressão e transtorno bipolar" }
        ]},
        { week: 6, phase: "Estudo Base", themes: [
            { area: "Clínica Médica", title: "Insuficiência Cardíaca", desc: "Classificação, diagnóstico e tratamento" },
            { area: "Medicina Intensiva", title: "Reanimação cardiopulmonar", desc: "BLS e ACLS" }
        ]},
        { week: 7, phase: "Estudo Base", themes: [
            { area: "Cirurgia", title: "Hérnias da parede abdominal", desc: "Diagnóstico e indicações cirúrgicas" },
            { area: "Pediatria", title: "Diarreia aguda e desidratação", desc: "Avaliação e terapia de reidratação" }
        ]},
        { week: 8, phase: "Estudo Base", themes: [
            { area: "Ginecologia/Obstetrícia", title: "Sangramento uterino anormal", desc: "Investigação e tratamento" },
            { area: "MFC/Saúde Coletiva", title: "Programa Nacional de Imunizações", desc: "Calendário vacinal" }
        ]},
        { week: 9, phase: "Estudo Base", themes: [
            { area: "Clínica Médica", title: "Pneumonias comunitárias", desc: "Diagnóstico e tratamento empírico" },
            { area: "Saúde Mental", title: "Transtornos de ansiedade", desc: "TAG, pânico e fobias" }
        ]},
        { week: 10, phase: "Estudo Base", themes: [
            { area: "Cirurgia", title: "Apendicite aguda", desc: "Diagnóstico clínico e cirúrgico" },
            { area: "Medicina Intensiva", title: "Choque", desc: "Classificação e manejo inicial" }
        ]},
        { week: 11, phase: "Estudo Base", themes: [
            { area: "Pediatria", title: "Infecções respiratórias agudas", desc: "Pneumonia, bronquiolite e asma" },
            { area: "Ginecologia/Obstetrícia", title: "Síndromes hipertensivas na gestação", desc: "Pré-eclâmpsia e eclâmpsia" }
        ]},
        { week: 12, phase: "Estudo Base", themes: [
            { area: "Clínica Médica", title: "DPOC e asma", desc: "Diagnóstico diferencial e tratamento" },
            { area: "MFC/Saúde Coletiva", title: "Vigilância epidemiológica", desc: "Doenças de notificação compulsória" }
        ]},
        { week: 13, phase: "Estudo Base", themes: [
            { area: "Cirurgia", title: "Colecistite aguda e coledocolitíase", desc: "Diagnóstico e tratamento" },
            { area: "Saúde Mental", title: "Transtornos psicóticos", desc: "Esquizofrenia e uso de antipsicóticos" }
        ]},
        { week: 14, phase: "Estudo Base", themes: [
            { area: "Pediatria", title: "Cardiopatias congênitas", desc: "Cardiopatias cianóticas e acianóticas" },
            { area: "Medicina Intensiva", title: "Insuficiência respiratória aguda", desc: "Oxigenoterapia e ventilação" }
        ]},
        { week: 15, phase: "Estudo Base", themes: [
            { area: "Ginecologia/Obstetrícia", title: "ISTs", desc: "Diagnóstico e tratamento" },
            { area: "Clínica Médica", title: "Doenças da tireoide", desc: "Hipo e hipertireoidismo" }
        ]},
        { week: 16, phase: "Estudo Base", themes: [
            { area: "Cirurgia", title: "Oclusão intestinal", desc: "Diagnóstico e conduta inicial" },
            { area: "MFC/Saúde Coletiva", title: "Atenção à saúde do idoso", desc: "Avaliação geriátrica ampla" }
        ]},
        { week: 17, phase: "Estudo Base", themes: [
            { area: "Pediatria", title: "Meningites", desc: "Diagnóstico, tratamento empírico e profilaxia" },
            { area: "Medicina Intensiva", title: "Sepse e choque séptico", desc: "Reconhecimento precoce e tratamento" }
        ]},
        { week: 18, phase: "Estudo Base", themes: [
            { area: "Clínica Médica", title: "Doenças renais", desc: "Insuficiência renal aguda e crônica" },
            { area: "Saúde Mental", title: "Transtornos por uso de substâncias", desc: "Álcool e outras drogas" }
        ]},
        { week: 19, phase: "Estudo Base", themes: [
            { area: "Ginecologia/Obstetrícia", title: "Diabetes gestacional", desc: "Rastreamento e manejo" },
            { area: "Cirurgia", title: "Queimaduras", desc: "Avaliação inicial e tratamento" }
        ]},
        { week: 20, phase: "Estudo Base", themes: [
            { area: "Pediatria", title: "Convulsões e epilepsia", desc: "Crise febril e estado epiléptico" },
            { area: "MFC/Saúde Coletiva", title: "Saúde da mulher", desc: "Planejamento familiar e anticoncepção" }
        ]},
        { week: 21, phase: "Estudo Base", themes: [
            { area: "Clínica Médica", title: "Hepatites virais", desc: "Diagnóstico e manejo" },
            { area: "Medicina Intensiva", title: "Distúrbios ácido-base", desc: "Interpretação de gasometria" }
        ]},
        { week: 22, phase: "Estudo Base", themes: [
            { area: "Cirurgia", title: "Pancreatite aguda", desc: "Classificação e tratamento" },
            { area: "Saúde Mental", title: "Emergências psiquiátricas", desc: "Risco de suicídio e agitação psicomotora" }
        ]},
        { week: 23, phase: "Estudo Base", themes: [
            { area: "Ginecologia/Obstetrícia", title: "Abortamento", desc: "Tipos e conduta" },
            { area: "Pediatria", title: "Anemia na infância", desc: "Ferropriva e outras causas" }
        ]},
        { week: 24, phase: "Estudo Base", themes: [
            { area: "Clínica Médica", title: "AVC", desc: "Isquêmico e hemorrágico" },
            { area: "MFC/Saúde Coletiva", title: "Hanseníase e tuberculose", desc: "Diagnóstico e tratamento" }
        ]},
        { week: 25, phase: "Fase de Revisão", themes: [
            { area: "Cirurgia", title: "Revisão Parte 1", desc: "Abdome agudo, apendicite, trauma e hérnias" },
            { area: "Cirurgia", title: "Revisão Parte 2", desc: "Colecistite, oclusão intestinal e pancreatite" }
        ]},
        { week: 26, phase: "Fase de Revisão", themes: [
            { area: "GO", title: "Revisão Parte 1", desc: "Pré-natal, trabalho de parto e síndromes hipertensivas" },
            { area: "GO", title: "Revisão Parte 2", desc: "Sangramento uterino, ISTs e diabetes gestacional" }
        ]},
        { week: 27, phase: "Fase de Revisão", themes: [
            { area: "Clínica Médica", title: "Revisão Parte 1", desc: "HAS, DM, insuficiência cardíaca e DPOC" },
            { area: "Clínica Médica", title: "Revisão Parte 2", desc: "Pneumonias, doenças renais, tireoide e AVC" }
        ]},
        { week: 28, phase: "Fase de Revisão", themes: [
            { area: "Pediatria", title: "Revisão Parte 1", desc: "Puericultura, doenças exantemáticas e diarreia" },
            { area: "Pediatria", title: "Revisão Parte 2", desc: "Infecções respiratórias, cardiopatias e meningites" }
        ]},
        { week: 29, phase: "Fase de Revisão", themes: [
            { area: "Saúde Coletiva", title: "Revisão Global", desc: "Rastreamento, imunização e vigilância" },
            { area: "Saúde Mental", title: "Revisão Global", desc: "Transtornos de humor, ansiedade e psicóticos" }
        ]},
        { week: 30, phase: "Fase de Revisão", themes: [
            { area: "Medicina Intensiva", title: "Revisão Parte 1", desc: "RCP, choque e sepse" },
            { area: "Medicina Intensiva", title: "Revisão Parte 2", desc: "Insuficiência respiratória e distúrbios ácido-base" }
        ]}
    ];

    const totalItems = scheduleData.length * 2;
    const checkedCount = Object.values(checkedItems).filter(v => v).length;
    const progressPercent = Math.round((checkedCount / totalItems) * 100);

    const toggleCheck = (weekIndex, themeIndex) => {
        const key = `${weekIndex}-${themeIndex}`;
        setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleWeek = (week) => {
        setExpandedWeeks(prev => ({ ...prev, [week]: !prev[week] }));
    };

    const areaColors = {
        "Clínica Médica": "text-blue-400 border-blue-400/20 bg-blue-400/5",
        "Pediatria": "text-pink-400 border-pink-400/20 bg-pink-400/5",
        "Cirurgia": "text-orange-400 border-orange-400/20 bg-orange-400/5",
        "Ginecologia/Obstetrícia": "text-purple-400 border-purple-400/20 bg-purple-400/5",
        "GO": "text-purple-400 border-purple-400/20 bg-purple-400/5",
        "MFC/Saúde Coletiva": "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
        "Saúde Coletiva": "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
        "Saúde Mental": "text-teal-400 border-teal-400/20 bg-teal-400/5",
        "Medicina Intensiva": "text-red-400 border-red-400/20 bg-red-400/5"
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8 font-sans selection:bg-indigo-500/30">
            <div className="max-w-5xl mx-auto space-y-10">
                <header className="relative p-8 md:p-12 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.15),transparent)]" />
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Trophy className="w-32 h-32 text-indigo-400" />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">ENAMED 2026</span>
                            </div>
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Progressivo</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-[0.9]"> Cronograma de <br /> <span className="text-indigo-500">Estudos ENAMED</span> </h1>
                        <p className="text-slate-400 text-sm md:text-base max-w-2xl font-light tracking-wide italic"> Cronograma progressivo do 4º ao 6º ano. Foco em raciocínio clínico e os temas de maior incidência na prova. </p>
                        <div className="pt-6 space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Progresso Geral da Aprovação</span>
                                <span className="text-3xl font-black italic text-indigo-400">{progressPercent}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-950 rounded-full border border-white/5 overflow-hidden">
                                <div className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>
                    </div>
                </header>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4">
                        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-indigo-400">
                            <Info className="w-4 h-4" /> Como usar este plano
                        </h2>
                        <ul className="space-y-3">
                            {[ 
                                "Cada semana contém 2 temas de áreas diferentes.",
                                "Marque os itens conforme concluir o estudo teórico e questões.",
                                "Foque em raciocínio clínico e revisão de provas passadas.",
                                "Sugestão: Dedique 3 a 4 horas de foco profundo por tema."
                            ].map((text, i) => (
                                <li key={i} className="flex gap-3 text-xs text-slate-400">
                                    <div className="mt-1 w-1 h-1 rounded-full bg-indigo-500/50 flex-shrink-0" /> {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl space-y-4">
                        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
                            <Zap className="w-4 h-4 text-indigo-400" /> Dicas Estratégicas
                        </h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="p-2 bg-white/5 rounded-lg h-fit"><Target className="w-4 h-4 text-indigo-400" /></div>
                                <p className="text-xs text-slate-400 italic">"Estude com questões. O ENAMED cobra padrão de reconhecimento. Não perca tempo decorando rodapés de livros."</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-2 bg-white/5 rounded-lg h-fit"><BookOpen className="w-4 h-4 text-indigo-400" /></div>
                                <p className="text-xs text-slate-400 italic">"Protocolos do Ministério da Saúde são a sua bíblia para Saúde Coletiva e Puericultura."</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                            <ClipboardList className="w-4 h-4" /> Plano Semanal de Execução
                        </h2>
                        <span className="text-[10px] text-slate-600 font-bold uppercase">30 Semanas • 60 Temas</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {scheduleData.map((item, weekIndex) => (
                            <div key={weekIndex} className={`transition-all duration-300 rounded-2xl border ${ expandedWeeks[item.week] ? 'bg-slate-900 border-slate-700 shadow-xl' : 'bg-slate-900/30 border-slate-800/50' }`}>
                                <button onClick={() => toggleWeek(item.week)} className="w-full flex items-center justify-between p-5 md:px-8">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black italic text-lg ${ expandedWeeks[item.week] ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500' }`}>
                                            {item.week}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.phase}</p>
                                            <h3 className={`text-sm md:text-base font-bold transition-colors ${expandedWeeks[item.week] ? 'text-white' : 'text-slate-400'}`}> Semana {item.week}</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="hidden md:flex gap-1">
                                            {item.themes.map((_, i) => (
                                                <div key={i} className={`w-2 h-2 rounded-full ${checkedItems[`${weekIndex}-${i}`] ? 'bg-green-500' : 'bg-slate-800'}`} />
                                            ))}
                                        </div>
                                        {expandedWeeks[item.week] ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-600" />}
                                    </div>
                                </button>
                                {expandedWeeks[item.week] && (
                                    <div className="px-5 md:px-8 pb-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                                        {item.themes.map((theme, themeIndex) => {
                                            const isChecked = checkedItems[`${weekIndex}-${themeIndex}`];
                                            return (
                                                <div key={themeIndex} onClick={() => toggleCheck(weekIndex, themeIndex)} className={`group cursor-pointer p-5 rounded-xl border-2 transition-all flex items-start gap-4 ${ isChecked ? 'bg-green-500/5 border-green-500/20' : 'bg-slate-950/50 border-slate-800 hover:border-slate-700' }`}>
                                                    <div className={`mt-1 flex-shrink-0 transition-transform duration-300 ${isChecked ? 'scale-110' : 'group-hover:scale-110'}`}> 
                                                        {isChecked ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-slate-700 group-hover:text-indigo-500" />}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <span className={`text-[9px] px-2 py-0.5 rounded border font-bold uppercase tracking-wider ${areaColors[theme.area] || 'bg-slate-800 text-slate-400 border-slate-700'}`}> {theme.area} </span>
                                                        <h4 className={`text-sm font-bold leading-tight ${isChecked ? 'text-slate-400 line-through' : 'text-white'}`}> {theme.title} </h4>
                                                        <p className="text-[11px] text-slate-500 font-light leading-relaxed"> {theme.desc}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <section className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-slate-800 p-8 md:p-12 rounded-[40px] text-center space-y-6">
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase italic"> Fase Final: <span className="text-indigo-500 underline decoration-indigo-500/30">Revisão Ativa</span> </h3>
                    <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed"> Não pare na Semana 24. As semanas 25-30 são decisivas para a consolidação da memória de longo prazo. Utilize resumos, flashcards e foque nos seus erros nas semanas anteriores.</p>
                    <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-6 opacity-30">
                        <div className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" /><span className="text-[9px] font-bold uppercase tracking-[0.3em]">Design ENAMED</span></div>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span className="text-[9px] font-bold uppercase tracking-[0.3em]">Foco ENAMED 2026</span></div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default App;