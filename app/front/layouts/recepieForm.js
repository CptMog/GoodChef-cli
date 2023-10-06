"use client";
import { useState,useEffect } from "react";
import styles from "./recepieForm.module.css";

export default function EditionForm({isRecepieEdited,recepie=0}){
    const [timeP,setTimeP] = useState([]);
    const [timeR,setTimeR] = useState([]);
    const [timeC,setTimeC] = useState([]);
    const [ingredientsIndex,setingredientsIndex] = useState(1);
    const [stepIndex,setStepIndex] = useState(1);
    const [ingredients,setIngredients] = useState([])
    const [steps,setSteps] = useState([]);
    const [clientInfo,setClientInfo] = useState(0);
    
    const sendCreate = async (data)=>{   
        const result = await fetch('http://localhost:8080/createRecepie',{ 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...data})
        })
        const response = result.json();
        return response;
    }

    const sendUpdate= async (data)=>{   
        const result = await fetch('http://localhost:8080/updateRecepie',{ 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...data,id:recepie.id})
        })
        const response = result.json();
        return response;
    }
    
    useEffect(()=>{
        if(recepie != 0){
            setSteps(JSON.parse(recepie.steps))
            setStepIndex(JSON.parse(recepie.steps).length)
            setIngredients(JSON.parse(recepie.ingredients))
            setingredientsIndex(JSON.parse(recepie.ingredients).length)
            setTimeP(recepie.time_prepare.split(/\h|\min/))
            setTimeR(recepie.time_rest.split(/\h|\min/))
            setTimeC(recepie.time_cooking.split(/\h|\min/))
        }
    },[recepie])
    // console.log(timeP,timeR,timeC)
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const form = new FormData(event.target)
        const data ={
            title:form.get('title'),
            description:form.get('desc'),
            ingredients:form.getAll('listingredient[]'),
            time_prepare:form.get('hourP') == 0?form.get('minP')+'min':form.get('hourP')+'h'+form.get('minP')+'min',
            time_rest:form.get('hourR') == 0?form.get('minR')+'min':form.get('hourR')+'h'+form.get('minR')+'min',     
            time_cooking:form.get('hourC') == 0?form.get('minC')+'min':form.get('hourC')+'h'+form.get('minC')+'min',
            image:form.get('image').name,
            steps:form.getAll('steps[]'),
            id_author:clientInfo.id
        }
        if(!isRecepieEdited){
            sendCreate(data).then(console.log)
        }else{
            sendUpdate(data).then(console.log)
        }
        await fetch('http://localhost:8080/uploads',{
            method:'POST',
            body:form
        })

    }
    useEffect(()=>{
        if(recepie == 0){
            let tab = []
            for (let index = 1; index <= stepIndex; index++) {
                tab.push(index)
            }
        
            setSteps(tab)
        }else{
            if(steps.length != stepIndex){
                setSteps([...steps,''])
            }
        }
    },[stepIndex])

    useEffect(()=>{
        if(recepie == 0){
            let tab = []
            for (let index = 1; index <= ingredientsIndex; index++) {
                tab.push(index)
            }
            setIngredients(tab)
        }else{
            if(ingredients.length != ingredientsIndex){
                setIngredients([...ingredients,''])
            }
        }
    },[ingredientsIndex])
    useEffect(()=>{
        async function getSession(){
             const idSession = localStorage.getItem('sessionID');
             const result = await fetch('http://localhost:8080/logged',{ 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionID:idSession })
             })
             const res = await result.json()
             setClientInfo(res.user);
        } 
        getSession()
        
     },[])

    return(
        <section className={styles.container}>
            <h2>Édition recette</h2>
            <form onSubmit={handleSubmit}>
                <fieldset className={styles.generalinfo}>
                    <legend>General</legend>
                    <div className={styles.formatedimage}>
                        <img src={recepie.image?"http://localhost:8080/uploads/"+recepie.image:"http://localhost:3000/imgbase.png"} alt="image"/>
                        <div className={styles.formatedinput}>
                            <label htmlFor="image">image</label>
                            <input type="file" required name="image" id="image" />     
                        </div>
                    </div> 
                    <div className={styles.infos}>
                        <div className={styles.formatedinput}>
                            <label htmlFor="title">titre</label>
                            {isRecepieEdited 
                                ?
                                <input type="text" defaultValue={recepie.title}  required name="title" id="title" />
                                :
                                <input type="text"  required name="title" id="title" />
                            }        
                        </div>
                        <div className={styles.formatedinput}>
                            <label htmlFor="desc">Présentation</label>
                            {isRecepieEdited 
                                ?
                                <textarea name="desc" defaultValue={recepie.description} required id="desc" cols={40} rows={9}></textarea>
                                :
                                <textarea name="desc" required id="desc" cols={40} rows={9}></textarea>
                            }
                        </div>
                    </div>
                    
                </fieldset>
                <fieldset className={styles.infosrecepie}>
                    <legend>Infos</legend>
                    <div className={styles.containertimes}>
                        <div className={styles.formatedinput}>
                            <span>temps de préparation</span>
                            <div className={styles.align}>
                            {isRecepieEdited 
                                ?
                                <input type="number" defaultValue={timeP.length == 3?timeP[0]:'0'} required id="hourP" name="hourP" />
                                :
                                <input type="number" required id="hourP" name="hourP" />
                            }
                                <label htmlFor="hourP">Heure(s)</label>
                            {isRecepieEdited 
                                ?
                                <input type="number" defaultValue={timeP.length == 3?timeP[1]:timeP[0]}  required id="minP" name="minP" />
                                :
                                <input type="number" required id="minP" name="minP" />
                            }
                                <label htmlFor="minP">Minute(s)</label>
                            </div>
                        </div>
                        <div className={styles.formatedinput}>
                            <span>temps de repos</span>
                            <div className={styles.align}>
                                {isRecepieEdited 
                                    ?
                                    <input type="number" defaultValue={timeR.length == 3?timeR[0]:'0'} required id="hourR" name="hourR" />
                                    :
                                    <input type="number" required id="hourR" name="hourR" />
                                }
                                <label htmlFor="hourR">Heure(s)</label>
                                {isRecepieEdited 
                                    ?
                                    <input type="number" defaultValue={timeR.length == 3?timeR[1]:timeR[0]}  required id="minR" name="minR" />
                                    :
                                    <input type="number" required id="minR" name="minR" />
                                }
                                <label htmlFor="minR">Minute(s)</label>
                            </div>
                        </div>
                        <div className={styles.formatedinput}>
                            <span>temps de cuisson</span>
                            <div className={styles.align}>
                                {isRecepieEdited 
                                    ?
                                    <input type="number" defaultValue={timeC.length == 3?timeC[0]:'0'} required id="hourC" name="hourC" />
                                    :
                                    <input type="number" required id="hourC" name="hourC" />
                                }
                                <label htmlFor="hourc">Heure(s)</label>
                                {isRecepieEdited 
                                    ?
                                    <input type="number" defaultValue={timeC.length == 3?timeC[1]:timeC[0]}  required id="minC" name="minC" />
                                    :
                                    <input type="number" required id="minC" name="minC" />
                                }
                                <label htmlFor="minc">Minute(s)</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        { isRecepieEdited
                            ?
                            ingredients.map((value,index)=>(
                                <div key={index} className={styles.formatedinput}>
                                     <label htmlFor="listingredient">ingrédient{index}</label>
                                    <textarea name="listingredient[]" defaultValue={value} className="listingredient" rows={2}></textarea>
                                </div>
                            ))
                            :
                            ingredients.map((value,index)=>(
                                <div key={index} className={styles.formatedinput}>
                                     <label htmlFor="listingredient">ingrédient{index}</label>
                                    <textarea name="listingredient[]" className="listingredient" rows={2}></textarea>
                                </div>
                            ))
                        }
                        <button onClick={(evt)=>{
                            setingredientsIndex(ingredientsIndex+1)
                            evt.preventDefault()
                            }}>
                            ajouter un ingrdient
                        </button>
                    </div>
                </fieldset>
                <fieldset className={styles.stepsrecepie}>
                    <legend>Préparation</legend>
                    {isRecepieEdited
                        ?
                        steps.map((value,index)=>(
                            <div key={index} className={styles.formatedinput}>
                                <label htmlFor="steps">etape{index}</label>
                                <textarea name="steps[]" defaultValue={value} className="steps" cols={40} rows={5}></textarea>

                            </div>
                        ))
                        :
                        steps.map((value,index)=>(
                            <div key={index} className={styles.formatedinput}>
                                <label htmlFor="steps">etape{index+1}</label>
                                <textarea name="steps[]" className="steps" cols={40} rows={5}></textarea>
                            </div>
                        ))
                    }
                    <div>
                        <button onClick={(evt)=>{
                            setStepIndex(stepIndex+1)
                            evt.preventDefault()
                            }}>
                            ajouter une étape
                        </button>
                    </div>
                </fieldset>
                <button type="submit">Enregistrer</button>
            </form>
        </section>
    )
}