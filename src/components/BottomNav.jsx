// Bottom tab bar for the home screen. Keeps the header uncluttered on phones.
// onAccount is optional: when it is missing (online features off) the Account tab is hidden.
const ICONS = {
  learn: <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  ranks: <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />,
  account: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
};

export default function BottomNav({ active = 'learn', onLearn, onRanks, onAccount }) {
  const items = [
    { id: 'learn', label: 'Learn', onClick: onLearn },
    { id: 'ranks', label: 'Ranks', onClick: onRanks },
    ...(onAccount ? [{ id: 'account', label: 'Account', onClick: onAccount }] : []),
  ];

  return (
    <nav className="bottom-nav" aria-label="Main">
      <div className="bottom-nav__inner">
        {items.map(({ id, label, onClick }) => (
          <button
            key={id}
            className={`bottom-nav__item ${active === id ? 'is-active' : ''}`}
            aria-current={active === id ? 'page' : undefined}
            onClick={onClick}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {ICONS[id]}
            </svg>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
