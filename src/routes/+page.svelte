<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
    import { Play, Pause, ChevronRight } from 'svelte-heros-v2';
  
    let pipelines = [
      { name: 'main-pipeline', status: 'succeeded', duration: '5m 30s', jobs: [
        { name: 'build', status: 'succeeded' },
        { name: 'test', status: 'succeeded' },
        { name: 'deploy', status: 'succeeded' }
      ]},
      { name: 'release-pipeline', status: 'failed', duration: '3m 45s', jobs: [
        { name: 'build', status: 'succeeded' },
        { name: 'test', status: 'failed' },
        { name: 'deploy', status: 'pending' }
      ]},
      { name: 'test-pipeline', status: 'running', duration: '2m 10s', jobs: [
        { name: 'unit-test', status: 'succeeded' },
        { name: 'integration-test', status: 'running' },
        { name: 'e2e-test', status: 'pending' }
      ]},
      { name: 'nightly-build', status: 'succeeded', duration: '15m 20s', jobs: [
        { name: 'cleanup', status: 'succeeded' },
        { name: 'build', status: 'succeeded' },
        { name: 'package', status: 'succeeded' }
      ]},
    ];
  </script>
  

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">Pipelines</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each pipelines as pipeline}
      <div class="bg-gray-800 rounded-lg p-4 flex flex-col h-full">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold truncate">{pipeline.name}</h2>
          <div class="flex space-x-2">
            <Button size="xs" class="bg-blue-600 hover:bg-blue-700"><Play size="14" /></Button>
            <Button size="xs" class="bg-gray-600 hover:bg-gray-700"><Pause size="14" /></Button>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-2">
          {#each pipeline.jobs as job}
            <div class="flex items-center bg-gray-700 rounded px-2 py-1 text-sm">
              <div class={`w-2 h-2 rounded-full mr-2 ${
                job.status === 'succeeded' ? 'bg-green-500' :
                job.status === 'failed' ? 'bg-red-500' :
                job.status === 'running' ? 'bg-blue-500' : 'bg-gray-500'
              }`}></div>
              <span class="truncate">{job.name}</span>
            </div>
          {/each}
        </div>
        <div class="text-sm text-gray-400 mt-auto">
          Status: <span class={
            pipeline.status === 'succeeded' ? 'text-green-500' :
            pipeline.status === 'failed' ? 'text-red-500' : 'text-blue-500'
          }>{pipeline.status}</span> | Duration: {pipeline.duration}
        </div>
      </div>
    {/each}
  </div>
</div>
