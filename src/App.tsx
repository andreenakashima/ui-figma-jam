import ReactFlow, {
	addEdge,
	Background,
	Connection,
	ConnectionMode,
	Controls,
	Node,
	useEdgesState,
	useNodesState,
} from "reactflow";
import { zinc } from "tailwindcss/colors";
import "reactflow/dist/style.css";

import { Square } from "./components/node/Square";
import { useCallback } from "react";
import DefaultEdge from "./components/edges/DefautEdge";

const NODE_TYPES = {
	square: Square,
};

const EDGE_TYPES = {
	default: DefaultEdge,
};

const INITIAL_NODES = [
	{
		id: crypto.randomUUID(),
		type: "square",
		position: { x: 200, y: 400 },
		data: {},
	},
	{
		id: crypto.randomUUID(),
		type: "square",
		position: { x: 1000, y: 400 },
		data: {},
	},
] satisfies Node[];

export function App() {
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

	const onConnect = useCallback((connection: Connection) => {
		return setEdges((edges) => addEdge(connection, edges));
	}, []);

	return (
		<div className="w-screen h-screen">
			<ReactFlow
				nodeTypes={NODE_TYPES}
				edgeTypes={EDGE_TYPES}
				nodes={nodes}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onNodesChange={onNodesChange}
				connectionMode={ConnectionMode.Loose}
				defaultEdgeOptions={{ type: "default" }}
			>
				<Background gap={12} size={2} color={zinc[200]} />
				<Controls />
			</ReactFlow>
		</div>
	);
}
