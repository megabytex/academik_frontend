var nav_menu = {

    template : `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Academik App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Programas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Asignaturas</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
                </a>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
            </ul>
            <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        </div>
    </nav>    
    `
}


var programas_new = {
    data(){
        return{
            newPrograma : {
                codigo_programa : "",
                nombre_programa : "",
                descripcion_programa : "",
            }
        }
    },
    methods : {
        createPrograma(){
            axios.post(`http://api-academic-env2.eba-fjrnsvgy.us-west-2.elasticbeanstalk.com/gestionacademica/listar_programas/`,{
                codigo_programa : this.newPrograma.codigo_programa,
                nombre_programa : this.newPrograma.nombre_programa,
                descripcion_programa : this.newPrograma.descripcion_programa,
            }).then(response => {
                this.newPrograma.codigo_programa = ""
                this.newPrograma.nombre_programa = ""
                this.newPrograma.descripcion_programa = ""
                vm.listarProgramas();
            }).catch(error => {
                console.log(error)
            })
        }
    },
    template : `
    <div class="col-lg-10 m-auto card p-auto">
        <div class="card-body col-md-8 m-auto">
            <h2>Nuevo Programa</h2>
            <form v-on:submit.prevent="createPrograma">
                <label for="id">ID</label>
                <input type="text" name="id" class="form-control" v-model="newPrograma.codigo_programa">
                <label for="nombre_programa">Nombre del Programa</label>
                <input type="text" name="nombre_programa" class="form-control" v-model="newPrograma.nombre_programa">
                <label for="descripcion_programa">Descripción del Programa</label>
                <input type="text" name="descripcion_programa" class="form-control" v-model="newPrograma.descripcion_programa">
                <button class="btn btn-primary mt-3" type="submit">Guardar</button>
            </form>
        </div>
    </div>`
}

var vm = new Vue({
    el : '#app',
    components : {
        'nav-menu' : nav_menu, 
        'programas-new' : programas_new 
    },
    data() {
        return{
            program : {
                codigo_programa : "",
                nombre_programa : "",
                descripcion_programa : ""
            },
            componen_edit : true,
            componen_new : false,
            datos : null
        }
    },
    methods: {
        listarProgramas(){
            axios.get(`http://api-academic-env2.eba-fjrnsvgy.us-west-2.elasticbeanstalk.com/listar_programas/`)
            .then(
                response => this.datos = response.data
            )
        },
        activar(dato1, dato2, datosPrograma){
            this.componen_new = dato1
            this.componen_edit = dato2
            this.getPrograma(datosPrograma)
        },
        getPrograma(datosPrograma){
            this.program.codigo_programa = datosPrograma.codigo_programa
            this.program.nombre_programa = datosPrograma.nombre_programa
            this.program.descripcion_programa = datosPrograma.descripcion_programa
        },
        editPrograma(){
           axios.put(`http://api-academic-env2.eba-fjrnsvgy.us-west-2.elasticbeanstalk.com/gestionacademica/detalles_programa/${this.program.codigo_programa}`,{
                codigo_programa : this.program.codigo_programa,
                nombre_programa : this.program.nombre_programa,
                descripcion_programa : this.program.descripcion_programa                
           }).then(response => {
                this.program.codigo_programa = ""
                this.program.nombre_programa = ""
                this.program.descripcion_programa = ""                
                this.listarProgramas();
           }).catch(error => {
                console.log(error);
           })        
        },
        deletePrograma(datosPrograma){
           var confirmacion = confirm("¿Estas seguro que deseas eliminar el programa "+datosPrograma.nombre_programa+"?");
           if(confirmacion){
                axios.delete(`http://api-academic-env2.eba-fjrnsvgy.us-west-2.elasticbeanstalk.com/gestionacademica/detalles_programa/${datosPrograma.codigo_programa}`)
                .then(reponse => {
                    this.listarProgramas();
                })
                .catch(error => {
                    console.log(error)
                })
           }
        }
    },
    mounted() {
       this.listarProgramas();
    },

})
