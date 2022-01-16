<template>
    <v-container>
    <!--una fila-->
        <v-row>
            <v-col cols="12" md="2"></v-col>
            <v-col md="10">
                    <v-card >
                    <v-card-text class="display-1 text-md-center">
                        <v-date-picker v-model="picker" full-width Locale="es-cl" :min="minimo"  @change="getInfo(picker)"></v-date-picker>
                    </v-card-text>
               </v-card>
            </v-col>
            <v-col cols="12" md="2"></v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="2"></v-col>
            <v-col cols="12"  md="10">
               <v-card color="error">
                    <v-card-text class="display-1 text-md-center">
                      {{ valor }} 
                    </v-card-text>
               </v-card>
            </v-col>
            <v-col cols="12" md="2">
                
            </v-col>
        </v-row>
    <v-dialog
      v-model="loader.estatte"
      width="500"
    >


      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
            {{ loader.title }}
        </v-card-title>
            Pr favor espere...
        <v-card-text>
  
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
      
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-container>
</template>

<script>
import axios from 'axios'
import { mapState,mapMutations } from 'vuex'
export default ({
    data(){
        return{
            picker  :   '',
            minimo  : '1984', 
            divisa  : null,
            valor   : null,
            
        }
    },
    methods: {
        async  getInfo(dia) {
            let splitDay = dia.split(['-'])
            let datee   = `${splitDay[2]}-${splitDay[1]}-${splitDay[0]} `
            //let dia = '28-11-2008'
            try {
                this.showLoader({title: " Cargando "})
                let datos = await axios.get(`https://mindicador.cl/api/dolar/${datee}`)

                if  (datos.data.serie.length > 0 ? this.valor = datos.data.serie[0].valor : this.valor =" Sin datos ")
                
                console.log( datos.data.serie[0].valor);
            } catch (error) {
                console.log('Error: ',error);
            }
            finally{
                this.hideLoader()
                console.log(this.loader.title);
            }
            
            
            //console.log('convertido'+datee);
            //console.log(dia);
        },
        ...mapMutations(['showLoader','hideLoader'])
    },
    created() {
        //this.getInfo(this.valor)
    },
    computed: {
       ...mapState(['loader'])
    },
})
</script>
