class main
{	

    constructor()
    {
        this.Visual = [];
        this.Solid = [];
        this.Trigger = [];
        this.ObjectCounter = 0;			

        this.pointCounter =0;

        this.myTriangle = [];
        this.Keys = [];
        this.level = 0;


        this.player = new this.player()
        this.diff = 0;

    }
    


    UpdateAll()
    {

        for(var i in this.Visual)
        {
            this.Visual[i].Update();
        }
        for(var i in this.Solid)
        {
            this.Solid[i].Update();
        }
        for(var i in this.Trigger)
        {
            this.Trigger[i].Update();
        }

        var health_var;
        console.log(this.player.ammo);
        
        
        
    }
    
    RenderAll()
    {
        for(var i in this.Visual)
        {
            this.Visual[i].Render(this.myWEBGL.program);
        }
        for(var i in this.Solid)
        {
            this.Solid[i].Render(this.myWEBGL.program);
        }
        for(var i in this.Trigger)
        {
            this.Trigger[i].Render(this.myWEBGL.program);
        }
    
    }
    CheckCollision(loc1,rad1,loc2, rad2)
    {
        
        if(Math.pow(loc1[0]-loc2[0],2) < rad1+ rad2 && Math.pow(loc1[1]-loc2[1],2) < rad1 + rad2 &&  Math.pow(loc1[2]-loc2[2],2) < rad1+rad2)
        {
            return true;
        }
        return false;

    }
    
    CreateObject(type, prefab, loc, rot)
    {
    //type 0 = visual
    //type 1 = solid
    //type 2 = trigger
    var temp = new prefab; //Yes this dark sorcery will work.
    var id = "ID"+this.ObjectCounter;
    this.ObjectCounter ++;
    temp.id = id;
    temp.prefab = prefab;
    temp.loc = loc;
    temp.rot = rot;
        switch(type)
        {
            case 0:
                this.Visual[id] = temp;
            break;
            case 1:
                this.Solid[id] = temp;
            break;
            case 2:
                this.Trigger[id] = temp;
            break;
            default:
            break;
        }		
    //We can return the game object to the calling function
    //Should the user want to set custom names or properties on it.
    return temp;
    }
    
    
    DestroyObject(id)
    {
        if(id in this.Visual)
        {
            delete this.Visual[id];
        }
        if(id in this.Solid)
        {
            console.log("Deleting Solid");
            delete this.Solid[id];
        }

        if(id in this.Trigger)
        {
            delete this.Trigger[id];
        }
    }
    
    KeyDown(event)
    {
        this.Keys[String.fromCharCode(event.keyCode)] = true;
        //console.log(String.fromCharCode(event.keyCode) +" should be true - "+this.Keys[String.fromCharCode(event.keyCode)]);
    }
    
    KeyUp(event)
    {
        this.Keys[String.fromCharCode(event.keyCode)] = false;
        //console.log(String.fromCharCode(event.keyCode) +" should be false - "+this.Keys[String.fromCharCode(event.keyCode)]);
    }
    
    MouseClick(event)
    {
        var rect = canvas.getBoundingClientRect();
        var realX = event.clientX - rect.left;
        var realY = event.clientY - rect.top;
        console.log(realX+","+realY);
        var x = -1 + 2*realX/myCanvas.width;
        var y = -1 + 2*(myCanvas.height - realY)/myCanvas.height;
        console.log("The click occurred on "+x+","+y);
    }


    reset(){
        for(var i in this.Visual)
        {
            m.DestroyObject(i);
        }

        for(var i in this.Solid)
        {
            m.DestroyObject(i);
        }

        for(var i in this.Trigger)
        {
            m.DestroyObject(i);
        }

        this.ObjectCounter = 0;
        this.CreateObject(2,Ground,[0,-.5,0],[0,0,0]);


    for(let i =0; i< 30; i++){

        for(let j =0; j< 30; j++){
            // 0 draw green tile grass 

            

            if(this.myMap[i][j] == 0){
                //	this.CreateObject(1,Wall,[j*2,2,i*2],[0,0,0]);
                
            }

            if(this.myMap[i][j] == 1){
                
                this.CreateObject(1,Wall,[j*2,0,i*2],[0,0,0]);
            }
            if(this.myMap[i][j] == 2){

                this.CreateObject(1,Camera,[j*2,0,-i*2],[0,0,0]);
                
            }
            if(this.myMap[i][j] == 3){
                this.CreateObject(1,TankEnemy,[j*2,.5,i*2], [0,0,0]);

            }
            if(this.myMap[i][j] == 4){
                this.CreateObject(1,RandEnemy,[j*2,.5,i*2], [0,0,0]);


            }

            if(this.myMap[i][j] == 5){
                this.CreateObject(1,PathEnemy,[j*2,.5,i*2], [0,0,0]);

            }
            if(this.myMap[i][j] == 6){
                this.CreateObject(1,Goal,[j*2,.51,i*2], [0,0,0]);

            }

            if(this.myMap[i][j] == 7){
                this.CreateObject(1,Crate,[j*2,-.3,i*2], [0,0,0]);
            }

            if(this.myMap[i][j] == 8){
                //this.CreateObject(1,BossEnemy,[j*2,-.1,i*2], [0,0,0]);
            }
        }
    }




    }
    


    rand(min,max){

        return Math.floor(Math.random()*(max-min+1)+min);
    }

    randf(min, max){

        return Math.random()*(max-min)+min;
    }

    Changediff(val){
        this.diff = val;
        console.log(this.diff);
    }

    static keyD(event)
    {
        m.KeyDown(event);
    }
    static keyU(event)
    {
        m.KeyUp(event);
    }

    static mouseH(event)
    {
        m.MouseClick(event);
    }
    
    static MainLoop()
    {
        m.UpdateAll();
        m.RenderAll();
        requestAnimationFrame(main.MainLoop);
    }

}
