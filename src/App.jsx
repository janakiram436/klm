// Import dependencies
import  { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleRemoveElements = (elementsToRemove) => {
    setNodes((nds) => nds.filter((node) => !elementsToRemove.some((el) => el.id === node.id)));
    setEdges((eds) => eds.filter((edge) => !elementsToRemove.some((el) => el.id === edge.id)));
  };

  const handleAddNode = () => {
    const id = `${nodes.length + 1}`;
    const newNode = {
      id,
      data: { label: `Node ${id}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleAddEdge = (source, target) => {
    const newEdge = { id: `e${source}-${target}`, source, target };
    setEdges((eds) => [...eds, newEdge]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, borderRight: '1px solid #ddd', padding: '10px' }}>
        <button onClick={handleAddNode}>Add Node</button>
        <button onClick={() => handleAddEdge('1', '2')}>Add Edge</button>
      </div>
      <div style={{ flex: 3 }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onElementsRemove={handleRemoveElements}
          >
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;
