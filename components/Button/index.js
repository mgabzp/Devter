import { colors } from "../../styles/theme";

export default function Button({ children, disabled, onClick }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        button {
          align-items: center;
          background: ${colors.black};
          border-radius: 9999px;
          border: 0;
          color: #fff;
          cursor: pointer;
          display: flex;
          font-size: 12px;
          font-weight: 800;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
          user-select: none;
        }
        /*este selector permite usar un atributo p/los estilos*/
        button[disabled] {
          pointer-events: none; /*quita el touch*/
          opacity: 0.2;
        }
        button > :global(svg) {
          margin-right: 8px;
        }
        button:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
}
