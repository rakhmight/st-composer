<template>
    <div class="work">
      <div class="work__content d-flex">
        <div class="work__logo d-flex flex-column justify-content-center justify-center">
          <v-img
          src="@/assets/media/work.png"
          contain
          max-width="40"
          ></v-img>
        <!-- <v-tooltip left color="error">
          <template v-slot:activator="{ on, attrs }">
            <div class="clear mb-1" 
              v-bind="attrs"
              v-on="on"> 
                <v-icon size="20" color="#ff4500">mdi-delete</v-icon>
                4
            </div>
          </template>
          <span>Автоматический удалится через: 4дн.</span>
        </v-tooltip> -->
        </div>
        <div class="work__info d-flex justify-content-center">
          <table>
            <tr>
              <td>Предмет:</td>
              <td style="color:#0167FF">02536</td>
            </tr>
            <tr>
              <td>Вопросов:</td>
              <td style="color:#0167FF">25</td>
            </tr>
            <tr>
              <td>Создан:</td>
              <td style="color:#0167FF">02.08.2023</td>
            </tr>
            <tr>
              <td>Изменён:</td>
              <td style="color:#0167FF">02.08.2023</td>
            </tr>
            
            <!-- <tr>
              <td style="color:orangered">Завершён:</td>
              <td style="color:orangered">02.08.2023</td>
            </tr> -->
          </table>
        </div>
      </div>
      <div class="work__menu">
        <v-tooltip bottom color="#00000073">
          <template v-slot:activator="{ on, attrs }">
            <div
            class="work__item d-flex justify-center"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>mdi-clock-time-eight</v-icon>
          </div>
          </template>
          <span>Посмотреть историю изменений</span>
        </v-tooltip>
        <v-tooltip bottom color="error">
          <template v-slot:activator="{ on, attrs }">
            <div
            class="work__item d-flex justify-center"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon color="red">mdi-delete</v-icon>
          </div>
          </template>
          <span>Удалить</span>
        </v-tooltip>
        <v-tooltip bottom color="#00000073">
          <template v-slot:activator="{ on, attrs }">
            <div
            class="work__item d-flex justify-center"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>mdi-pen</v-icon>
          </div>
          </template>
          <span>Изменить параметры</span>
        </v-tooltip>
        <v-tooltip bottom color="#00000073">
          <template v-slot:activator="{ on, attrs }">
            <div
            class="work__item d-flex justify-center"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon color="#0167FF">mdi-arrow-right-thin</v-icon>
          </div>
          </template>
          <span>Перейти к редактированию</span>
        </v-tooltip>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.work{
  width: 250px;
  height: 150px;
  background-color: rgb(240, 240, 240);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  transition: box-shadow 0.2s ease-in-out;
}
.work:hover{
  box-shadow: 0px 6px 8px -1px rgb(0 0 0 / 20%), 0px 8px 9px 0px rgb(0 0 0 / 14%), 0px 5px 14px 0px rgb(0 0 0 / 12%);
}

.work__content{
height: 100%;
padding: 15px 10px 0;
}
.work__logo{
  height: 100%;
  width: 60px;
  opacity: 0.5;
}
.work__info{
  width: 100%;
  margin-left: 15px;
}

.work__menu{
  width: 100%;
  height: 32px;
  display: grid;
  border-top: 1px solid rgb(156, 156, 156);
  grid-template-columns: 1fr 1fr 1fr 1.5fr;
}

.work__item:hover{
background-color: rgb(224, 224, 224);
}
.work__item:not(:first-child){
  border-left: 1px solid rgb(156, 156, 156);
}

.work__info>table{
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
}

.clear{
  font-size: 0.8em;
  color:#ff4500
}
</style>