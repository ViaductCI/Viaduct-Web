<script lang="ts">
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  
    type $$Props = NodeProps;
    export let data: $$Props['data'];
  
    // Helper function to determine status color
    function getStatusColor(status: string | undefined): string {
      if (!status) return 'bg-gray-500';
      
      switch (status.toLowerCase()) {
        case 'running': return 'bg-blue-500';
        case 'success': return 'bg-green-500';
        case 'failed': return 'bg-red-500';
        case 'pending': return 'bg-yellow-500';
        default: return 'bg-gray-500';
      }
    }
  
    // Ensure all data properties have default values
    const {
      emoji = '❓',
      name = 'Unknown',
      job = 'No description',
      status,
      runtime = 'N/A',
      lastRun = 'N/A'
    } = data || {};
  </script>
  
  <div class="px-4 py-3 shadow-md rounded-md bg-gray-800 border border-gray-700">
    <div class="flex items-center">
      <div class="rounded-full w-10 h-10 flex justify-center items-center bg-gray-700 text-2xl">
        {emoji}
      </div>
      <div class="ml-3 flex-grow">
        <div class="text-lg font-bold text-white">{name}</div>
        <div class="text-sm text-gray-400">{job}</div>
      </div>
      <div class={`w-3 h-3 rounded-full ${getStatusColor(status)} animate-pulse`}></div>
    </div>
    <div class="mt-2 text-sm">
      <div class="flex justify-between text-gray-400">
        <span>Runtime:</span>
        <span>{runtime}</span>
      </div>
      <div class="flex justify-between text-gray-400">
        <span>Last Run:</span>
        <span>{lastRun}</span>
      </div>
    </div>
    <Handle
        type="target"
        position={Position.Top}
        class="w-16 !bg-indigo-500 rounded-none border-none shadow-[0_0_10px_3px_rgba(99,102,241,0.6)] transition-shadow duration-300 hover:shadow-[0_0_15px_5px_rgba(99,102,241,0.8)]"
    />
    <Handle
        type="source"
        position={Position.Bottom}
        class="w-16 !bg-indigo-500 rounded-none border-none shadow-[0_0_10px_3px_rgba(99,102,241,0.6)] transition-shadow duration-300 hover:shadow-[0_0_15px_5px_rgba(99,102,241,0.8)]"
    />
  </div>