<template>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="breadcrumb-item"
          :class="{ active: index === items.length - 1 }"
        >
          <template v-if="index !== items.length - 1">
            <router-link :to="item.href">{{ item.label }}</router-link>
          </template>
          <template v-else>
            {{ item.label }}
          </template>
        </li>
      </ol>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Breadcrumb",
    props: {
      items: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(
            (item) => typeof item.label === "string" && typeof item.href === "string"
          );
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .breadcrumb {
    list-style: none;
    display: flex;
    gap: 0.5rem;
    padding: 0;
    font-size: 1.4rem;
    margin-bottom: 20px;
    margin-top: -5px;
  }
  
  .breadcrumb-item::after {
    content: ">";
    margin-left: 0.5rem;
  }
  
  .breadcrumb-item:last-child::after {
    content: "";
  }
  
  .breadcrumb-item a {
    text-decoration: none;
    color: blue;
  }
  
  .breadcrumb-item.active a {
    color: gray;
    pointer-events: none;
  }
  </style>
  