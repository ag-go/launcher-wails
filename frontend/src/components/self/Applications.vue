<script setup lang="ts">

import {ListApplications, RunApplication} from "../../../wailsjs/go/main/App";
import {onMounted, ref} from "vue";
import {Command} from "@fzdwx/launcher-api";
import {applications} from "../../../wailsjs/go/models";
import {useViewEvent} from "../../composables/useViewEvent";
import {View} from "../../utils";
import Shortcuts from "../common/Shortcuts.vue";

const apps = ref<applications.Application[]>([])
const refreshApps = async () => {
  apps.value = (await ListApplications()).sort((a, b) => b.count - a.count)
};

onMounted(refreshApps)

const {emitter} = useViewEvent();
emitter.on('changeView', (view: string) => {
  if (view === View.Self) {
    (refreshApps)()
  }
})

const handleSelectItem = (item: applications.Application) => {
  RunApplication(item.name, "apps", item.Exec, item.terminal)
}

</script>

<template>
  <Command.Group heading="Applications">
    <Command.Item v-for="application in apps"
                  @select="handleSelectItem(application)"
                  noHandleSpace
                  :data-value="application.name">
      <img :src="'/favicon.ico?/'+application.icon" alt="icon" class="w-6 h-6 mr-2"/>
      {{ application.name }}

      <Shortcuts :name="application.name"/>
    </Command.Item>
  </Command.Group>
</template>

<style scoped>

</style>
