import useUndoableState from "@jeremyling/react-use-undoable-state";

const init = { text: "it is the default text, you can edit it" };

export default function UndoRedoBox() {
  const {
    state: doc,
    setState: setDoc,
    resetState: resetDoc,
    index: docStateIndex,
    lastIndex: docStateLastIndex,
    goBack: undoDoc,
    goForward: redoDoc
  } = useUndoableState(init, 500);

  const canUndo = docStateIndex > 0;
  const canRedo = docStateIndex < docStateLastIndex;

  return (
    <div style={{ display: "block",textAlign:'center' }}>
      <textarea
        style={{ margin: "16px",width:'40%',height:'150px' }}
        onChange={(event) => setDoc({ text: event.target.value })}
        rows={5}
        value={doc.text}
      />
      <div>
        <button
          onClick={() => undoDoc()}
          disabled={!canUndo}
          style={{ marginRight: "8px" }}
        >
          Undo
        </button>
        <button
          onClick={() => redoDoc()}
          disabled={!canRedo}
          style={{ marginRight: "8px" }}
        >
          Redo
        </button>
        <button onClick={() => resetDoc(init)}>Reset</button>
      </div>
    </div>
  );
}
