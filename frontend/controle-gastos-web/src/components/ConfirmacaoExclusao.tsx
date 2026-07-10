interface ConfirmacaoExclusaoProps {
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ConfirmacaoExclusao({ mensagem, onConfirmar, onCancelar }: ConfirmacaoExclusaoProps) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, background: '#fff7f7' }}>
      <p>{mensagem}</p>
      <button onClick={onConfirmar} style={{ marginRight: 8 }}>Sim</button>
      <button onClick={onCancelar}>Não</button>
    </div>
  );
}
