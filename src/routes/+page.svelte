<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
    import { Play, Pause, ChevronRight } from 'svelte-heros-v2';
    import { onMount } from 'svelte';
 
    let pipelines = [];
    let loading = true;
    let error = null;

    // Function to fetch targets from our API
    async function fetchTargets() {
        try {
            const response = await fetch('http://localhost:8000/api/targets');
            if (!response.ok) {
                throw new Error('Failed to fetch targets');
            }
            const data = await response.json();
            
            // Transform API data to match our UI format
            pipelines = data.targets.map(target => ({
                name: target.name,
                status: 'pending', // Placeholder until we add status tracking
                duration: '-',     // Placeholder until we add duration tracking
                repository: target.repository,
                branch: target.branch,
                jobs: [
                    // Placeholder jobs based on having the pipeline config,
                    // In future we could fetch each target's pipeline config to show real jobs
                    { name: 'fetch', status: 'pending' },
                    { name: 'build', status: 'pending' },
                    { name: 'test', status: 'pending' }
                ]
            }));
        } catch (e) {
            error = e.message;
            console.error('Error fetching targets:', e);
        } finally {
            loading = false;
        }
    }

    // Function to trigger a pipeline build
    async function triggerBuild(pipeline) {
        try {
            const response = await fetch('http://localhost:8000/api/trigger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    repository: pipeline.repository,
                    branch: pipeline.branch
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to trigger build');
            }

            // For now we'll just refetch the targets
            // In future we could update the UI with build status
            await fetchTargets();
        } catch (e) {
            console.error('Error triggering build:', e);
            // You might want to show this error to the user
        }
    }

    onMount(fetchTargets);
</script>

<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Pipelines</h1>

    {#if loading}
        <div class="text-center py-8">
            <div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p class="mt-4 text-gray-400">Loading pipelines...</p>
        </div>
    {:else if error}
        <div class="bg-red-500 text-white p-4 rounded-lg mb-4">
            {error}
        </div>
    {:else if pipelines.length === 0}
        <div class="text-center py-8 text-gray-400">
            <p>No pipelines found. Add a target to get started.</p>
        </div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each pipelines as pipeline}
                <div class="bg-gray-800 rounded-lg p-4 flex flex-col h-full">
                    <div class="flex justify-between items-center mb-2">
                        <h2 class="text-lg font-semibold truncate">{pipeline.name}</h2>
                        <div class="flex space-x-2">
                            <Button 
                                size="xs" 
                                class="bg-blue-600 hover:bg-blue-700"
                                on:click={() => triggerBuild(pipeline)}
                            >
                                <Play size="14" />
                            </Button>
                            <Button size="xs" class="bg-gray-600 hover:bg-gray-700">
                                <Pause size="14" />
                            </Button>
                        </div>
                    </div>
                    <div class="text-sm text-gray-400 mb-2">
                        <div class="truncate">Repository: {pipeline.repository}</div>
                        <div class="truncate">Branch: {pipeline.branch}</div>
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
    {/if}
</div>