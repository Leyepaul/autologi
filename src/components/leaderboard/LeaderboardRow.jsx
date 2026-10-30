const MEDALS = ['🥇', '🥈', '🥉'];

export default function LeaderboardRow({ row, isMe }) {
  const medal = MEDALS[row.position - 1];
  return (
    <li className={`lb-row ${isMe ? 'is-me' : ''}`}>
      <span className="lb-row__pos">{medal || row.position}</span>
      <span className="lb-row__name">
        {row.display_name}{isMe && <em> (you)</em>}
      </span>
      <span className="lb-row__xp">⚡ {row.total_xp}</span>
    </li>
  );
}
