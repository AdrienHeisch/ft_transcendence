<script lang="ts">
import type { ResolvedPathname } from "$app/types";

type Route = {
  route: ResolvedPathname;
  method: "GET" | "POST" | "PUT" | "DELETE";
  description: string;
  parameters: { name: string; type: string; description: string }[];
};

const apiRoutes: Route[] = [
  {
    route: "/api/persons",
    method: "GET",
    description: "",
    parameters: [
      {
        name: "search",
        type: "string",
        description: "Search by name",
      },
      {
        name: "city",
        type: "string",
        description: "City code",
      },
      {
        name: "sortBy",
        type: '"firstName" | "lastName"',
        description: "Sort by first or last name",
      },
    ],
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
    parameters: [
      {
        name: "firstName",
        type: "string",
        description: "First name",
      },
      {
        name: "lastName",
        type: "string",
        description: "Last name",
      },
      {
        name: "bio",
        type: "string",
        description: "Profile description",
      },
      {
        name: "city",
        type: "string",
        description: "City code",
      },
      {
        name: "avatar",
        type: "File",
        description: "Profile picture",
      },
      {
        name: "removeAvatar",
        type: "boolean",
        description: "Set to true to remove profile picture",
      },
    ],
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
  <p>Parameters: GET requests take arguments in the URL query string, other requests should have a multipart/formdata encoded body.</p>
  <h2>Routes</h2>
  <div>
    {#each apiRoutes as apiRoute}
      <div>
        <p>{apiRoute.route}</p>
        <p>{apiRoute.method}</p>
        <p>{apiRoute.description}</p>
        {#if apiRoute.method === "GET"}
          <p>Query parameters:</p>
        {:else}
          <p>Parameters:</p>
        {/if}
        <ul>
          {#each apiRoute.parameters as param}
            <li>
              <p>{param.name}</p>
              <p>{param.type}</p>
              <p>{param.description}</p>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>
