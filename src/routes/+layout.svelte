<script>
    import "../app.css";
    import { Navbar, NavBrand, NavLi, NavUl, Input } from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';

    let searchInput;

    onMount(() => {
        const handleKeyDown = (event) => {
            if (event.key === '/' && document.activeElement !== searchInput) {
                event.preventDefault();
                searchInput.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });
</script>

<div class="bg-gray-900 min-h-screen text-white">
  <Navbar class="bg-gray-800 border-gray-700 p-4">
    <NavBrand href="/">
      <img src="https://concourse-ci.org/images/logo-white.svg" class="mr-3 h-6 sm:h-9" alt="Concourse Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold">ViaductCI</span>
    </NavBrand>
    <div class="hidden relative md:block">
      <div class="flex absolute inset-y-0 start-0 items-center ps-3 pointer-events-none">
        <SearchOutline class="w-4 h-4" />
      </div>
      <Input id="search-navbar" class="ps-10" placeholder="Search..." />
    </div>

    <div href="/" class="text-gray-400 hover:text-white">Dashboard</div>
  </Navbar>
  <slot></slot>
</div>