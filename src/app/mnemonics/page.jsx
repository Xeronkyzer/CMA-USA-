'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import mnemonicsData from '@/data/mnemonics.json';
import styles from './page.module.css';

export default function MnemonicsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activePartFilter, setActivePartFilter] = useState('all');

    const filteredSections = useMemo(() => {
        const parts = activePartFilter === 'all'
            ? mnemonicsData.parts
            : mnemonicsData.parts.filter(p => p.id === activePartFilter);

        if (!searchQuery.trim()) return parts;

        const q = searchQuery.toLowerCase();
        return parts.map(part => ({
            ...part,
            sections: part.sections
                .map(section => ({
                    ...section,
                    items: section.items.filter(item =>
                        item.name.toLowerCase().includes(q) ||
                        item.formula.toLowerCase().includes(q) ||
                        item.mnemonic.toLowerCase().includes(q) ||
                        item.tip.toLowerCase().includes(q)
                    )
                }))
                .filter(section => section.items.length > 0)
        })).filter(part => part.sections.length > 0);
    }, [searchQuery, activePartFilter]);

    const totalItems = mnemonicsData.parts.reduce(
        (sum, p) => sum + p.sections.reduce((s, sec) => s + sec.items.length, 0), 0
    );

    const highlight = (text) => {
        if (!searchQuery.trim()) return text;
        const q = searchQuery.toLowerCase();
        const idx = text.toLowerCase().indexOf(q);
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <mark className={styles.highlight}>{text.slice(idx, idx + searchQuery.length)}</mark>
                {text.slice(idx + searchQuery.length)}
            </>
        );
    };

    return (
        <div className={`container ${styles.container}`}>
            <Link href="/syllabus" className={styles.backLink}>← Back to Syllabus</Link>

            <header className={styles.header}>
                <h1>🧠 Mnemonics & Memory Aids</h1>
                <p className={styles.subtitle}>
                    {totalItems} memory tricks across all CMA sections — remember formulas, not frustration.
                </p>
            </header>

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <input
                    type="text"
                    placeholder="Search mnemonics, formulas, tips…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <div className={styles.filters}>
                    {['all', 'part1', 'part2'].map(f => (
                        <button
                            key={f}
                            className={`${styles.filterBtn} ${activePartFilter === f ? styles.active : ''}`}
                            onClick={() => setActivePartFilter(f)}
                        >
                            {f === 'all' ? 'All' : f === 'part1' ? 'Part 1' : 'Part 2'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {filteredSections.length === 0 ? (
                <div className={styles.emptyState}>
                    <span>🔍</span>
                    <p>No mnemonics match "<strong>{searchQuery}</strong>"</p>
                </div>
            ) : (
                filteredSections.map(part => (
                    <div key={part.id} className={styles.partGroup}>
                        <h2 className={styles.partTitle}>{part.title}</h2>

                        {part.sections.map(section => (
                            <div key={section.id} className={styles.sectionGroup}>
                                <div className={styles.sectionHeader}>
                                    <h3>
                                        <span className={styles.sectionNum}>§{section.number}</span>
                                        {section.title}
                                    </h3>
                                    <span className={styles.weightBadge}>{section.weight}</span>
                                </div>

                                <div className={styles.cardsGrid}>
                                    {section.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className={`${styles.card} ${item.conceptual ? styles.conceptCard : ''}`}
                                        >
                                            <div className={styles.cardHeader}>
                                                <span className={styles.cardName}>
                                                    {highlight(item.name)}
                                                </span>
                                                {item.conceptual && (
                                                    <span className={styles.conceptBadge}>Concept</span>
                                                )}
                                            </div>

                                            <div className={styles.formulaRow}>
                                                <span className={styles.formulaLabel}>Formula</span>
                                                <div className={styles.formulaText}>
                                                    {highlight(item.formula)}
                                                </div>
                                            </div>

                                            <div className={styles.mnemonicRow}>
                                                <span className={styles.mnemonicLabel}>💡</span>
                                                <div className={styles.mnemonicText}>
                                                    "{highlight(item.mnemonic)}"
                                                </div>
                                            </div>

                                            <div className={styles.tipRow}>
                                                <span className={styles.tipIcon}>📝</span>
                                                <p className={styles.tipText}>{highlight(item.tip)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}
