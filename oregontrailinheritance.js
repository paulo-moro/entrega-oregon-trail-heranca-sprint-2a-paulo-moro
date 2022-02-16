class Wagon {
    constructor(capacity){
        this._capacity = capacity
        this._passenger = []
    }
    set capacity(novaCapacity){
        if(typeof this._capacity == "number" && typeof novaCapacity == "number"){
            this._capacity = novaCapacity
        }
        else {
            console.log("o input deve ser um número")
        }
    }
    get capacity(){
        if(typeof this_capacity == "number"){
            return this._capacity
        }
        else{
            console.log("Informe um input válido(Número)")
            return this._capacity = undefined
        }
    }
    
    
    join(passenger){
        if(this._capacity > this._passenger.length){
            return this._passenger.push(passenger)
        }else{
            return "Não tem espaço para ele(a)!"
        }

    }
    totalFood(){
        let accFood = 0
        this._passenger.forEach((passageiro)=>{
            accFood += passageiro._food
        })
        return accFood
    }
    getAvailableSeatCount(){
        return this._capacity-this._passenger.length
    }
    shouldQuarantine(){
        let quarentine = false
        this._passenger.forEach((passageiro)=>{
            if(passageiro._isHealth == false){
                return quarentine = true

            }
        })
        return quarentine
    }
}

class Traveler{
    constructor(nome,food = 1, isHealthy = true){
       
        this._nome = nome
        this._food = food
        this._isHealth = isHealthy
        
    }
    get nome(){
        return this._nome
    }
    set nome(novoNome){
        this._nome = novoNome
    }
    get food(){
        return this._food
    }
    set food(maisFood){
        this._food = maisFood
    }
    get isHealthy(){
        return this._isHealth
    }
    set isHealthy(novaSaude){
        this._isHealth =novaSaude
    }
    

    hunt(){
        
        this._food += 2
        
        return `${this.nome} caça mais comida`    
    }
    
    eat(){
        if(this._food - 1 < 0){
            this._food = 0
            this._isHealth = false
            return `${this.nome} agora está com fome(doente)`
        }else{
            
            return this._food -= 1
        }
    }
}

class Hunter extends Traveler{
    constructor(nome,isHealthy){
        super(nome,isHealthy)
        this._food = 2
        

    }
    

    hunt(){
        
        this._food += 5
        
        return `${this.nome} caça mais comida`    
    }
    
    eat(){
        if(this._food - 2 < 0){
            this._food = 0
            this._isHealth = false
            return `${this.nome} agora está com fome(doente)`
        }else{
            
            return this._food -= 2
        }
    }
    giveFood(traveler, numOfFoodUnits){
        
        if(numOfFoodUnits > this._food){
            return traveler._food + 0
        }
        else{
            this._food -= numOfFoodUnits
            traveler._food += numOfFoodUnits
            console.log(`${this._nome} deu ${numOfFoodUnits} de comida para ${traveler._nome}`)
        }
    }
}

class Doctor extends Traveler{
    constructor(nome, food, isHealthy){
        super(nome, food, isHealthy)
        
    }
    
    heal(traveler){
        if(traveler._isHealth == false){
            traveler._isHealth = true
            console.log(`${traveler._nome} foi curado(a)`)
        }
    }
}


// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
 
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
 
wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
 
sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();
 
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
 
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
 
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
 
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
 
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente
 
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);