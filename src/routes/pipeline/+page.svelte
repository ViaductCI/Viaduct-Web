<script>
    import { writable } from 'svelte/store';
    import { SvelteFlow, Background, Controls, MarkerType, MiniMap } from '@xyflow/svelte';
    import '@xyflow/svelte/dist/style.css';


    import { initialNodes, initialEdges } from '../components/graph/nodes-and-edges';
    import CustomNode from '../components/graph/CustomNode.svelte';

    const nodes = writable(initialNodes);
    const edges = writable(initialEdges);

    const nodeTypes = {
      custom: CustomNode
    };
  
    let flowInstance;
  
    function onInit(flowRef) {
      flowInstance = flowRef;
      flowInstance.fitView();
    }
  </script>
  
  <main class="bg-gray-900 text-white">
    <h1 class="text-2xl font-bold mb-4">Pipeline Visualization</h1>
    <div class="flow-container">
        <SvelteFlow {nodes} {nodeTypes} {edges} fitView class="bg-gray-900">
            <Background />
            <MiniMap />
            <Controls buttonColor="#1f2937" buttonBgColor="#1f2937"/>
        </SvelteFlow>
    </div>
  </main>
  
  <style>
    main {
      height: 100vh;
      padding: 20px;
    }
  
    .flow-container {
      height: calc(100% - 60px);
      background-color: #2d3748;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
  
    :global(.react-flow__node) {
      padding: 10px;
      border-radius: 5px;
      font-size: 12px;
      color: #e2e8f0;
      border: 1px solid #4a5568;
      background-color: #1a202c;
      width: 150px;
      text-align: center;
    }
  
    :global(.react-flow__node-input) {
      background-color: #2c5282;
    }
  
    :global(.react-flow__node-output) {
      background-color: #2f855a;
    }
  
    :global(.react-flow__handle) {
      background-color: #4a5568;
    }
  
    :global(.react-flow__edge-path) {
      stroke: #4a5568;
    }
  
    :global(.react-flow__controls) {
      box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
    }
  
    :global(.react-flow__controls-button) {
      background-color: #4a5568;
      color: #e2e8f0;
      border-bottom: 1px solid #2d3748;
    }
  
    :global(.react-flow__controls-button:hover) {
      background-color: #718096;
    }
  
    :global(.react-flow__attribution) {
      background-color: rgba(0, 0, 0, 0.4);
    }
  </style>