import "./BellCountPanel.css";

type Props = {
  count: number | null;
};

const BellCountPanel = ({ count }: Props) => {
  if (count === null) return null;

  return (
    <p className="bell-count">
      お鈴が鳴らされた回数：
      <span className="bell-count__number">{count} </span>
      回
    </p>
  );
};

export default BellCountPanel;