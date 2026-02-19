<script lang="ts">
import type { ResolvedPathname } from "$app/types";

type Route = {
  route: ResolvedPathname;
  method: "GET" | "POST" | "PUT" | "DELETE";
  description: string;
  parameters: { name: string; type: string }[];
};

const apiRoutes: Route[] = [
  {
    route: "/api/persons",
    method: "GET",
    description: "",
    parameters: [],
  },
  {
    route: "/api/persons/[id]",
    method: "GET",
    description: "",
    parameters: [],
  },
  {
    route: "/api/persons/[id]",
    method: "PUT",
    description: "",
    parameters: [],
  },
  {
    route: "/api/persons/[id]",
    method: "DELETE",
    description: "",
    parameters: [],
  },
  {
    route: "/api/associations",
    method: "GET",
    description: "",
    parameters: [],
  },
  {
    route: "/api/associations/[id]",
    method: "GET",
    description: "",
    parameters: [],
  },
  {
    route: "/api/associations/[id]",
    method: "PUT",
    description: "",
    parameters: [],
  },
  {
    route: "/api/associations/[id]",
    method: "DELETE",
    description: "",
    parameters: [],
  },
  {
    route: "/api/pets",
    method: "GET",
    description: "",
    parameters: [],
  },
  {
    route: "/api/pets",
    method: "POST",
    description: "",
    parameters: [],
  },
  {
    route: "/api/pets/[id]",
    method: "GET",
    description: "",
    parameters: [],
  },
  {
    route: "/api/pets/[id]",
    method: "PUT",
    description: "",
    parameters: [],
  },
  {
    route: "/api/pets/[id]",
    method: "DELETE",
    description: "",
    parameters: [],
  },
  {
    route: "/api/posts",
    method: "GET",
    description: "",
    parameters: [],
  },
  {
    route: "/api/posts",
    method: "POST",
    description: "",
    parameters: [],
  },
  {
    route: "/api/posts/[id]",
    method: "GET",
    description: "",
    parameters: [],
  },
  {
    route: "/api/posts/[id]",
    method: "PUT",
    description: "",
    parameters: [],
  },
  {
    route: "/api/posts/[id]",
    method: "DELETE",
    description: "",
    parameters: [],
  },
  {
    route: "/api/posts/[id]/comments",
    method: "GET",
    description: "",
    parameters: [],
  },
  {
    route: "/api/posts/[id]/comments",
    method: "POST",
    description: "",
    parameters: [],
  },
  {
    route: "/api/posts/[id]/comments/[id]",
    method: "GET",
    description: "",
    parameters: [],
  },
  {
    route: "/api/posts/[id]/comments/[id]",
    method: "PUT",
    description: "",
    parameters: [],
  },
  {
    route: "/api/posts/[id]/comments/[id]",
    method: "DELETE",
    description: "",
    parameters: [],
  },
];
</script>

<div>
  <h1>API documentation</h1>
  <p>Authentication: set the "Api-Key" header in your requests to the key found in your account settings.</p>
  <h2>Routes</h2>
  <div class="grid">
    {#each apiRoutes as apiRoute}
      <div>
        <h3>{apiRoute.route}</h3>
        <p>{apiRoute.method}</p>
        <p>{apiRoute.description}</p>
        {#if apiRoute.method === "GET"}
          <h4>Query parameters:</h4>
        {:else}
          <h4>Parameters:</h4>
        {/if}
        <ul>
          {#each apiRoute.parameters as param}
            <li>{param.name}: {param.type}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>
