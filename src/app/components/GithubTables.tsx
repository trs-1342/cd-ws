"use client";

import { useEffect, useMemo, useState } from "react";

// ============================
// Ayarlar
// ============================
const REPOS = [
    { owner: "iguGH2026", repo: "c-dersleri", label: "c-dersleri" },
    { owner: "trs-1342", repo: "cd-ws", label: "cd-ws" },
];

// İsteğe bağlı: .env içine NEXT_PUBLIC_GITHUB_TOKEN koyarsan oran limitin genişler
const GH_TOKEN =
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GITHUB_TOKEN : undefined;

// Küçük fetch yardımcıları
async function gh<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`https://api.github.com${path}`, {
        headers: {
            Accept: "application/vnd.github+json",
            ...(GH_TOKEN ? { Authorization: `Bearer ${GH_TOKEN}` } : {}),
        },
        ...init,
        cache: "no-store",
    });
    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`GitHub API ${res.status}: ${txt || res.statusText}`);
    }
    return res.json();
}

type Repo = {
    full_name: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    pushed_at: string; // last commit time (repo-level)
    open_issues_count: number;
};

type Pull = { html_url: string; number: number; title: string };
type Contributor = { login: string; html_url: string; contributions: number };
type ContentItem = {
    name: string;
    path: string;
    type: "file" | "dir" | "symlink" | "submodule";
    html_url?: string;
    download_url?: string | null;
};

type User = {
    login: string;
    followers: number;
    following: number;
    public_repos: number;
    html_url: string;
};

type Commit = {
    sha: string;
    commit: { message: string; author?: { date?: string; name?: string } };
    html_url: string;
    author: { login?: string } | null;
};

// Basit tarih formatı
function fmtDate(iso?: string) {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ============================
// Ana bileşen
// ============================
export default function GithubTables() {
    // Genel tablo state’i
    const [repos, setRepos] = useState<Record<string, Repo | null>>({});
    const [openPRs, setOpenPRs] = useState<Record<string, number>>({});
    const [contributors, setContrib] = useState<Record<string, Contributor[]>>({});

    // c-dersleri derin bakış
    const deepRepo = REPOS[0]; // c-dersleri
    const [contents, setContents] = useState<ContentItem[] | null>(null);
    const [recentCommits, setRecentCommits] = useState<Commit[] | null>(null);
    const [readmeOK, setReadmeOK] = useState<boolean | null>(null);

    // Profil
    const [profile, setProfile] = useState<User | null>(null);

    // Hatalar
    const [error, setError] = useState<string | null>(null);

    // Yükleniyor flags
    const loadingGeneral = useMemo(
        () => REPOS.some(r => !repos[key(r)]),
        [repos]
    );
    const loadingDeep = contents === null || recentCommits === null || readmeOK === null;
    const loadingProfile = !profile && !error;

    function key(r: { owner: string; repo: string }) {
        return `${r.owner}/${r.repo}`;
    }

    useEffect(() => {
        (async () => {
            try {
                // 1) Genel tablo için her repo:
                await Promise.all(
                    REPOS.map(async (r) => {
                        const k = key(r);

                        // repo meta
                        const repo = await gh<Repo>(`/repos/${r.owner}/${r.repo}`);
                        // open PR sayısı (en çok 100 say)
                        const pulls = await gh<Pull[]>(
                            `/repos/${r.owner}/${r.repo}/pulls?state=open&per_page=100`
                        );
                        // en aktif katkıcılar (son contributions) – ilk 3
                        const contrib = await gh<Contributor[]>(
                            `/repos/${r.owner}/${r.repo}/contributors?per_page=3&anon=true`
                        );

                        setRepos((s) => ({ ...s, [k]: repo }));
                        setOpenPRs((s) => ({ ...s, [k]: pulls.length }));
                        setContrib((s) => ({ ...s, [k]: contrib.slice(0, 3) }));
                    })
                );

                // 2) Derin bakış: c-dersleri root içerik + commitler + readme var mı?
                const root = await gh<ContentItem[]>(
                    `/repos/${deepRepo.owner}/${deepRepo.repo}/contents/`
                );
                setContents(root.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)));

                const commits = await gh<Commit[]>(
                    `/repos/${deepRepo.owner}/${deepRepo.repo}/commits?per_page=10`
                );
                setRecentCommits(commits);

                try {
                    await gh(`/repos/${deepRepo.owner}/${deepRepo.repo}/readme`);
                    setReadmeOK(true);
                } catch {
                    setReadmeOK(false);
                }

                // 3) Profil
                const user = await gh<User>(`/users/iguGH2026`);
                setProfile(user);
            } catch (e: any) {
                setError(e?.message || "Bilinmeyen hata");
            }
        })();
    }, []);

    return (
        <section className="section" style={{ padding: "24px 0" }}>
            <h2 id="generalStatusHeading">GitHub Durumu</h2>

            {error && (
                <div className="note" style={{ margin: "10px 0" }}>
                    <strong>Hata:</strong> {error}
                    <div style={{ marginTop: 6, fontSize: 13 }}>
                        (<code>NEXT_PUBLIC_GITHUB_TOKEN</code> ekleyip oran sınırını
                        yükseltebilirsin.)
                    </div>
                </div>
            )}

            {/* <table id="generalStatus" className="github-table">
                <thead>
                    <tr>
                        <th>Repository</th>
                        <th>★</th>
                        <th>🍴</th>
                        <th>👁️</th>
                        <th>Son Commit</th>
                        <th>Açık PR</th>
                        <th>Aktif Katkıcılar</th>
                    </tr>
                </thead>
                <tbody>
                    {REPOS.map((r) => {
                        const k = key(r);
                        const meta = repos[k];
                        const prs = openPRs[k];
                        const top3 = contributors[k];

                        return (
                            <tr key={k}>
                                <td>
                                    <a href={`https://github.com/${r.owner}/${r.repo}`} target="_blank">
                                        {r.label}
                                    </a>
                                </td>
                                <td>{meta ? meta.stargazers_count : "…"}</td>
                                <td>{meta ? meta.forks_count : "…"}</td>
                                <td>{meta ? meta.watchers_count : "…"}</td>
                                <td>{meta ? fmtDate(meta.pushed_at) : "…"}</td>
                                <td>{prs ?? "…"}</td>
                                <td>
                                    {top3
                                        ? top3.map((c, i) => (
                                            <a key={i} href={c.html_url} target="_blank" style={{ marginRight: 8 }}>
                                                {c.login}
                                            </a>
                                        ))
                                        : "…"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table> */}

            <h2 id="deepDiveHeading">Detaylı Görünüm: <code>c-dersleri</code></h2>
            <table id="deepDive" className="github-table">
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Tür</th>
                        <th>Bağlantı</th>
                    </tr>
                </thead>
                <tbody>
                    {loadingDeep && (
                        <tr>
                            <td colSpan={3}>Yükleniyor…</td>
                        </tr>
                    )}
                    {!loadingDeep &&
                        contents?.map((it) => (
                            <tr key={it.path}>
                                <td>{it.type === "dir" ? `📁 ${it.name}` : `📄 ${it.name}`}</td>
                                <td>{it.type}</td>
                                <td>
                                    <a
                                        href={`https://github.com/${deepRepo.owner}/${deepRepo.repo}/tree/main/${it.path}`}
                                        target="_blank"
                                    >
                                        GitHub’da aç
                                    </a>
                                </td>
                            </tr>
                        ))}
                    {!loadingDeep && readmeOK === false && (
                        <tr>
                            <td colSpan={3}>README.md bulunamadı.</td>
                        </tr>
                    )}
                    {!loadingDeep && readmeOK === true && (
                        <tr>
                            <td colSpan={3}>README.md mevcut ✅</td>
                        </tr>
                    )}
                    {!loadingDeep && recentCommits && (
                        <>
                            <tr>
                                <th colSpan={3} style={{ textAlign: "left" }}>
                                    Son Commitler
                                </th>
                            </tr>
                            {recentCommits.slice(0, 8).map((c) => (
                                <tr key={c.sha}>
                                    <td colSpan={2}>
                                        <a href={c.html_url} target="_blank">
                                            {c.commit.message.split("\n")[0]}
                                        </a>
                                    </td>
                                    <td style={{ whiteSpace: "nowrap" }}>
                                        {fmtDate(c.commit.author?.date)}{" "}
                                        <span style={{ opacity: 0.7 }}>
                                            — {c.author?.login || c.commit.author?.name || "anon"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>

            <h2 id="userStatsHeading">
                Profil İstatistikleri: <code>iguGH2026</code>
            </h2>
            <table id="userStats" className="github-table">
                <tbody>
                    {loadingProfile ? (
                        <tr>
                            <td colSpan={2}>Yükleniyor…</td>
                        </tr>
                    ) : profile ? (
                        <>
                            <tr>
                                <td>Takipçi</td>
                                <td>{profile.followers}</td>
                            </tr>
                            <tr>
                                <td>Takip</td>
                                <td>{profile.following}</td>
                            </tr>
                            <tr>
                                <td>Public Repo</td>
                                <td>{profile.public_repos}</td>
                            </tr>
                            <tr>
                                <td>Profil</td>
                                <td>
                                    <a href={profile.html_url} target="_blank">
                                        {profile.html_url}
                                    </a>
                                </td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td colSpan={2}>Profil bulunamadı.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}
