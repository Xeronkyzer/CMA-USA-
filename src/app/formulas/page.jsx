'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import formulasData from '@/data/formulas.json';
import styles from './page.module.css';

export default function FormulasPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activePartFilter, setActivePartFilter] = useState('all'); // 'all' | 'part1' | 'part2'
    const [activeSectionFilter, setActiveSectionFilter] = useState('all');

    // Flatten all sections for the section filter dropdown
    const allSections = useMemo(() => {
        return formulasData.parts.flatMap(part =>
            part.sections.map(s => ({ id: s.id, title: `${s.number}. ${s.title}`, partId: part.id }))
        );
    }, []);

    // Filter and search
    const filteredParts = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        return formulasData.parts
            .filter(part => activePartFilter === 'all' || part.id === activePartFilter)
            .map(part => ({
                ...part,
                sections: part.sections
                    .filter(section => activeSectionFilter === 'all' || section.id === activeSectionFilter)
                    .map(section => ({
                        ...section,
                        formulas: section.formulas.filter(f => {
                            if (!query) return true;
                            return (
                                f.name.toLowerCase().includes(query) ||
                                f.formula.toLowerCase().includes(query) ||
                                (f.variables && f.variables.toLowerCase().includes(query)) ||
                                (f.category && f.category.toLowerCase().includes(query))
                            );
                        }),
                    }))
                    .filter(section => section.formulas.length > 0 || (section.conceptNote && !query)),
            }))
            .filter(part => part.sections.length > 0);
    }, [searchQuery, activePartFilter, activeSectionFilter]);

    // Count total formulas
    const totalFormulas = useMemo(() => {
        return formulasData.parts.reduce((acc, part) =>
            acc + part.sections.reduce((sAcc, s) => sAcc + s.formulas.length, 0), 0
        );
    }, []);

    const displayedFormulas = useMemo(() => {
        return filteredParts.reduce((acc, part) =>
            acc + part.sections.reduce((sAcc, s) => sAcc + s.formulas.length, 0), 0
        );
    }, [filteredParts]);

    // Group formulas by category within a section
    const groupByCategory = (formulas) => {
        const groups = {};
        formulas.forEach(f => {
            const cat = f.category || '_ungrouped';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(f);
        });
        return groups;
    };

    return (
        <div className={`container ${styles.container}`}>
            <header className={styles.header}>
                <Link href="/" className={styles.backLink}>← Home</Link>
                <h1>📐 Formula Quick-Reference Sheet</h1>
                <p className={styles.subtitle}>
                    All <strong>{totalFormulas}</strong> formulas across Part 1 & Part 2 — searchable, filterable, exam-ready.
                </p>
            </header>

            {/* Filters & Search */}
            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search formulas... (e.g., WACC, breakeven, ROE)"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    {searchQuery && (
                        <button className={styles.clearBtn} onClick={() => setSearchQuery('')}>✕</button>
                    )}
                </div>

                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <button
                            className={`${styles.filterBtn} ${activePartFilter === 'all' ? styles.active : ''}`}
                            onClick={() => { setActivePartFilter('all'); setActiveSectionFilter('all'); }}
                        >
                            All
                        </button>
                        <button
                            className={`${styles.filterBtn} ${activePartFilter === 'part1' ? styles.active : ''}`}
                            onClick={() => { setActivePartFilter('part1'); setActiveSectionFilter('all'); }}
                        >
                            Part 1
                        </button>
                        <button
                            className={`${styles.filterBtn} ${activePartFilter === 'part2' ? styles.active : ''}`}
                            onClick={() => { setActivePartFilter('part2'); setActiveSectionFilter('all'); }}
                        >
                            Part 2
                        </button>
                    </div>

                    <select
                        className={styles.sectionSelect}
                        value={activeSectionFilter}
                        onChange={e => setActiveSectionFilter(e.target.value)}
                    >
                        <option value="all">All Sections</option>
                        {allSections
                            .filter(s => activePartFilter === 'all' || s.partId === activePartFilter)
                            .map(s => (
                                <option key={s.id} value={s.id}>{s.title}</option>
                            ))
                        }
                    </select>
                </div>

                {searchQuery && (
                    <p className={styles.resultCount}>
                        Showing <strong>{displayedFormulas}</strong> of {totalFormulas} formulas
                    </p>
                )}
            </div>

            {/* Formulas Content */}
            <div className={styles.content}>
                {filteredParts.length === 0 ? (
                    <div className={styles.noResults}>
                        <h3>No formulas found</h3>
                        <p>Try a different search term or clear the filters.</p>
                    </div>
                ) : (
                    filteredParts.map(part => (
                        <div key={part.id} className={styles.partBlock}>
                            <h2 className={styles.partTitle}>{part.title}</h2>

                            {part.sections.map(section => {
                                const groups = groupByCategory(section.formulas);
                                const hasCategories = Object.keys(groups).some(k => k !== '_ungrouped');

                                return (
                                    <div key={section.id} className={styles.sectionBlock}>
                                        <div className={styles.sectionHeader}>
                                            <h3>
                                                <span className={styles.sectionNum}>{section.number}.</span>
                                                {section.title}
                                            </h3>
                                            <div className={styles.sectionMeta}>
                                                <span className={styles.weight}>{section.weight}</span>
                                                <span className={styles.count}>{section.formulas.length} formulas</span>
                                                <Link href={`/topic/${section.id}`} className={styles.studyLink}>
                                                    Study Notes →
                                                </Link>
                                            </div>
                                        </div>

                                        {section.conceptNote && section.formulas.length === 0 && (
                                            <div className={styles.conceptNote}>
                                                <span>📝</span> {section.conceptNote}
                                            </div>
                                        )}

                                        {hasCategories ? (
                                            Object.entries(groups).map(([category, formulas]) => (
                                                category !== '_ungrouped' ? (
                                                    <div key={category} className={styles.categoryGroup}>
                                                        <h4 className={styles.categoryTitle}>{category}</h4>
                                                        <div className={styles.formulaGrid}>
                                                            {formulas.map((f, i) => (
                                                                <FormulaCard key={i} formula={f} query={searchQuery} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div key="_ungrouped" className={styles.formulaGrid}>
                                                        {formulas.map((f, i) => (
                                                            <FormulaCard key={i} formula={f} query={searchQuery} />
                                                        ))}
                                                    </div>
                                                )
                                            ))
                                        ) : (
                                            <div className={styles.formulaGrid}>
                                                {section.formulas.map((f, i) => (
                                                    <FormulaCard key={i} formula={f} query={searchQuery} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))
                )}
            </div>

            {/* Print Hint */}
            <div className={styles.printHint}>
                <p>💡 <strong>Tip:</strong> Use <kbd>Ctrl</kbd> + <kbd>P</kbd> to print this page as a PDF for offline reference.</p>
            </div>
        </div>
    );
}

function FormulaCard({ formula, query }) {
    const highlight = (text) => {
        if (!query || !text) return text;
        const q = query.toLowerCase();
        const idx = text.toLowerCase().indexOf(q);
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <mark className={styles.highlight}>{text.slice(idx, idx + query.length)}</mark>
                {text.slice(idx + query.length)}
            </>
        );
    };

    // Check if formula contains an = sign to split into LHS and RHS for visual clarity
    const hasEquals = !formula.note && formula.formula.includes('=');
    const [lhs, ...rhsParts] = hasEquals ? formula.formula.split('=') : [null];
    const rhs = rhsParts.join('='); // rejoin in case there are multiple = signs

    return (
        <div className={`${styles.formulaCard} ${formula.note ? styles.conceptCard : ''}`}>
            <div className={styles.formulaName}>{highlight(formula.name)}</div>

            {formula.note ? (
                <div className={styles.formulaNote}>
                    <span className={styles.noteIcon}>💡</span>
                    <span>{highlight(formula.formula)}</span>
                </div>
            ) : hasEquals ? (
                <div className={styles.formulaExpression}>
                    <span className={styles.formulaLhs}>{highlight(lhs.trim())}</span>
                    <span className={styles.formulaEquals}>=</span>
                    <span className={styles.formulaRhs}>{highlight(rhs.trim())}</span>
                </div>
            ) : (
                <div className={styles.formulaExpression}>
                    <span className={styles.formulaRhs}>{highlight(formula.formula)}</span>
                </div>
            )}

            {formula.variables && (
                <div className={styles.formulaVars}>
                    <span className={styles.whereLabel}>Where:</span>
                    <ul className={styles.varList}>
                        {formula.variables.split('·').map((v, i) => {
                            const trimmed = v.trim();
                            const eqIdx = trimmed.indexOf('=');
                            if (eqIdx > 0) {
                                return (
                                    <li key={i}>
                                        <strong>{trimmed.slice(0, eqIdx).trim()}</strong>
                                        {' = '}
                                        {trimmed.slice(eqIdx + 1).trim()}
                                    </li>
                                );
                            }
                            return <li key={i}>{trimmed}</li>;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
