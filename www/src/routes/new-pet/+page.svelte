<script lang="ts">
import { createPet } from "$lib/pets.remote";
</script>

<div>
  <p>New pet</p>
  <form class="flex flex-col" {...createPet}>
    <div><label>Name: <input {...createPet.fields.name.as("text")} placeholder="Garfield" required /></label></div>
    <div><label>Species: <input {...createPet.fields.species.as("text")} placeholder="Cat" required /></label></div>
    <div><label>Breed: <input {...createPet.fields.breed.as("text")} placeholder="Orange Lasagna" required /></label></div>
    <div><label>Age: <input {...createPet.fields.age.as("number")} placeholder="8" required /></label></div>
    <div><button type="submit">Create</button></div>
  </form>
</div>
