"use client";
import styles from "./page.module.css"
import { useEffect,useRef, useState } from "react";
import { Grid,html,h } from "gridjs";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function AdministratorPage(){
    const clientTabRef = useRef(null);
    const categoryTabRef = useRef(null);
    const recepieTabRef = useRef(null);
    const classificationRef = useRef(null);
    const [openModal,setOpenModal] = useState(-1);
    const [catagorie,setCategorie] = useState(0);
    const [classification,setClassification] = useState(0);
    const [recepies,setRecepies] = useState([])
    const [catagories,setCategories] = useState([])
    //requests
    const registerCategorie = async (evt)=>{
        evt.preventDefault()
        const data = new FormData(evt.target)
        
        await fetch('http://localhost:8080/createCategorie',{
            method:'POST', 
            headers:{'content-type' : 'application/json'},
            body:JSON.stringify({name:data.get('name'),image:data.get('image').name})
        })
        .then(data=>data.json())
        .then(data=>alert(data.msg))  
        await fetch('http://localhost:8080/uploads',{
            method:'POST',
            body:data
        })
        // setOpenModal(-1)      
    }
    const updateCategorie = async (evt)=>{
        evt.preventDefault()
        const data = new FormData(evt.target)
        await fetch('http://localhost:8080/updateCategorie',{
            method:'POST', 
            headers:{'content-type' : 'application/json'},
            body:JSON.stringify({id:catagorie[0].data,name:data.get('name'),image:data.get('image').name != ''?data.get('image').name:catagorie[2].data})
        })
        .then(data=>data.json())
        .then(data=>alert(data.msg)) 
        await fetch('http://localhost:8080/uploads',{
            method:'POST',
            body:data
        })
        setCategorie(0) 
        setOpenModal(-1)      
    }
    const registerClassification = async (evt)=>{
        evt.preventDefault();
        const data = new FormData(evt.target)

        if(data.get('recepie') != '0' && data.get('category') != '0'){
            await fetch('http://localhost:8080/createClassification',{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({id_recepie:data.get('recepie'),id_category:data.get('category')})
            })
            .then(data=>data.json())
            .then(data => alert(data.msg)) 
        }else{
            alert("Erreur: il faut renseigner un article et une categorie")
        }
        
        setOpenModal(-1)
    }
    const updateClassification = async (evt)=>{
        evt.preventDefault();
        const data = new FormData(evt.target)
        if(data.get('recepie') != '0' && data.get('category') != '0'){
            await fetch('http://localhost:8080/updateClassification',{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({id:classification[0].data,id_recepie:data.get('recepie'),id_category:data.get('category')})
            })
            .then(data=>data.json())
            .then(data => alert(data.msg))
        }else{
            alert("Erreur: il faut renseigner un article et une categorie")
        }
        setClassification(0)
        setOpenModal(-1)
    }

    //Modal content
    const editionCategory = ()=>(
        <div className={styles.body}>
            <h3>Edition d'une categorie</h3>
            <form onSubmit={catagorie == 0?registerCategorie:updateCategorie}>
                <div className={styles.formated}>
                    <label htmlFor="name">Nom</label>
                    <input type="text" defaultValue={catagorie!=0?catagorie[1].data:""} required id="name" name="name" />
                </div>
                <div className={styles.formated}>
                    <label htmlFor="image">image</label>
                    <input type="file" name="image" id="image" />
                    {catagorie!=0&& <span>image :{catagorie[2].data}</span> }
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    )  
    const editionClassification = ()=>(
        <div className={styles.body}>
            <h3>Edition d'une categorie</h3>
            <form onSubmit={classification == 0?registerClassification:updateClassification}>
                <div className={styles.formated}>
                    <label htmlFor="name">recette</label>
                    <select defaultValue={classification!=0?classification[1].data:''} name="recepie">
                        <option value={'0'}>choisire une recette</option>
                        {
                            recepies.map((recepie,index)=>(
                                <option key={index} value={recepie.id}>{recepie.title}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.formated}>
                     <label htmlFor="name">catagorie</label>
                    <select defaultValue={classification!=0?classification[2].data:''} name="category">
                        <option value={'0'}>choisire une categorie</option>
                        {
                            catagories.map((categorie,index)=>(
                                <option key={index} value={categorie.id}>{categorie.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    ) 
 
    const dialogContainer=()=>(
        <dialog className={styles.modal} open={true}>
            <div className={styles.head}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setOpenModal(-1)} width="24" height="24" viewBox="0 0 24 24" style={{fill:"rgba(0, 0, 0, 1)"}}><path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path></svg>
            </div>
            { openModal == 1 && editionCategory()}
            { openModal == 2 && editionClassification()}
        </dialog>
    )  
    const updateModeration = async(id_recepie,moderation_state)=>{
        const req = await fetch('http://localhost:8080/moderateRecepie',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id:id_recepie,moderation_state:moderation_state }) 
        })
        const res = await req.json()
        return res;
    }
    const deleteRecepie = async(id_recepie)=>{
        const req = await fetch('http://localhost:8080/deleteAdminRecepie',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id:id_recepie }) 
        })
        const res = await req.json()
        return res;
    }
    const sendUpdateModeration = (evt,row)=>{
        updateModeration(row.cells[0].data,evt.target.value)
        .then(data => alert(data.msg))
    }
    const router = useRouter()
    useEffect(()=>{
        if(localStorage.getItem("sessionID") == null){
            router.push("/")
        }
        async function getRecepies(){
            const req = await fetch('http://localhost:8080/getAdminRecepies')
            const res = await req.json()
            return res;
        }
        async function getCategories(){
            const req = await fetch('http://localhost:8080/getAdminCategories')
            const res = await req.json()
            return res;
        }
        getRecepies().then(data=>setRecepies(data.recepies))
        getCategories().then(data=>setCategories(data.catagories))
    },[])

    //all users
    useEffect(() => {
        new Grid({
            columns: [
            {id:'id',name:'id',sort:true},
            {id:'first_name',name:'first_name'},
            {id:'last_name',name:'last_name'},
            {id:'email',name:'email'},
            {id:'password',name:'password'},
            {id:'image',name:'image'},
            {id:'description',name:'description'},
            {id:'is_admin',name:'is_admin'},
            {id:'edition',name:'edition',formatter: (cell, row) => {
                return h('button', {
                  className: 'btnedit',
                //   onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                }, 'Edit');
              }
            },
            {id:'supprimer',name:'supprimer',formatter: (cell, row) => {
                return h('button', {
                  className: 'btnsupp',
                //   onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                }, 'Supprimer');
            }}
            ],
            server: {
                url: "http://localhost:8080/getUsers",
                then: data => data.users,
                handle: (res) => {
                    if (res.status === 404) return {data: []};
                    if (res.ok) return res.json();
                    throw Error('oh no :(');
                },
            }
        }).render(clientTabRef.current)
    },[]);

    //all categories
    useEffect(() => {
        new Grid({
            columns: [
            {id:'id',name:'id',sort:true},
            {id:'name',name:'name'},
            {id:'image',name:'image'},
            {id:'showed',name:'showed',formatter:(cell,row)=>{
                return _(<select value={cell} onChange={async(evt)=>{
                    await fetch('http://localhost:8080/showStateCategory',{
                        method:'POST',
                        headers:{'content-type':'application/json'},
                        body:JSON.stringify({id:row.cells[0].data,showed:evt.target.value})
                    })
                    .then(data=>data.json())
                    .then(data => alert(data.msg))
                }}>
                            <option value={'0'}>0</option>
                            <option value={'1'}>1</option>
                        </select>)
            }},
            {id:'edition',name:'edition',formatter: (cell, row) => {
                return _(<button onClick={()=>{setOpenModal(1);setCategorie(row.cells)}}>Editer</button>);
              }
            },
            {id:'supprimer',name:'supprimer',formatter: (cell, row) => {
                return _(<button onClick={async()=>{
                    await fetch('http://localhost:8080/deleteCategorie',{
                        method:'POST',
                        headers:{'content-type':'application/json'},
                        body:JSON.stringify({id:row.cells[0].data})
                    })
                    .then(data=>data.json())
                    .then(data=> alert(data.msg))
                }}>Supprimer</button>)
            }}
            ],
            server: {
                url: "http://localhost:8080/getAdminCategories",
                then: data => data.catagories,
                handle: (res) => {
                    if (res.status === 404) return {data: []};
                    if (res.ok) return res.json();
                    throw Error('oh no :(');
                },
            }
        }).render(categoryTabRef.current)
    },[]);
    
    //all recepies
    useEffect(() => {
        new Grid({
            columns: [
            {id:'id',name:'id',sort:true},
            {id:'id_author',name:'id_author'},
            {id:'title',name:'title'},
            {id:'url',name:'url'},
            {id:'description',name:'description'},
            {id:'ingredients',name:'ingredients'},
            {id:'steps',name:'steps'},
            {id:'image',name:'image'},
            {id:'time_prepare',name:'time_prepare'},
            {id:'time_rest',name:'time_rest'},
            {id:'time_cooking',name:'time_cooking'},
            {id:'date',name:'date',sort:true},
            {id:'moderation_state',name:'moderation_state',formatter:(cell,row) =>{ 

                return _(
                    <select value={cell} onChange={(evt)=>sendUpdateModeration(evt,row)}>
                        <option value='-1'>-1</option>
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                    </select>
                        )
            }},
            {id:'une',name:'une',formatter:(cell,row) =>{ 

                return _(
                    <select value={cell} onChange={async (evt)=>{
                        await fetch('http://localhost:8080/putRecepieUne',{
                            method:'POST',
                            headers:{'content-type':'application/json'},
                            body:JSON.stringify({id:row.cells[0].data,state:evt.target.value})
                        }).then(data=>data.json()).then(data=>alert(data.msg))
                    }}>
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                    </select>
                        )
            }},
            {id:'trend',name:'trend',formatter:(cell,row) =>{ 

                return _(
                    <select value={cell} onChange={async (evt)=>{
                        await fetch('http://localhost:8080/putRecepieTrends',{ 
                            method:'POST',
                            headers:{'content-type':'application/json'},
                            body:JSON.stringify({id:row.cells[0].data,state:evt.target.value})
                        }).then(data=>data.json()).then(data=>alert(data.msg))
                    }}>
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                    </select>
                        )
            }},
            {id:'supprimer',name:'supprimer',formatter: (cell, row) => {
                return h('button', {
                  className: 'btnsupp',
                  
                  onClick: () =>deleteRecepie(row.cells[0].data).then(data=>alert(data.msg))
                }, 'Supprimer');
            }}
            ],
            server: {
                url: "http://localhost:8080/getAdminRecepies",
                then: data => data.recepies,
                handle: (res) => {
                    if (res.status === 404) return {data: []};
                    if (res.ok) return res.json();
                    throw Error('oh no :(');
                },
            }
        }).render(recepieTabRef.current)
    },[]);

    //all classification
    useEffect(() => {
        new Grid({
            columns: [
            {id:'id',name:'id',sort:true},
            {id:'id_recepie',name:'id_recepie',sort:true},
            {id:'id_category',name:'id_category',sort:true},
            {id:'editer',name:'editer',formatter:(cell,row) =>{ 
             return _(<button onClick={()=>{setOpenModal(2);setClassification(row.cells)}}>Editer</button>);
            }},
            {id:'supprimer',name:'supprimer',formatter: (cell, row) => {
                return _(<button onClick={async()=>{
                    await fetch("http://localhost:8080/deleteClassification",{
                        method:'POST',
                        headers:{'content-type':'application/json'},
                        body:JSON.stringify({id:row.cells[0].data})
                    })
                    .then(data=>data.json())
                    .then(data => alert(data.msg))
                }}>
                            Supprimer
                        </button>)
            }}
            ],
            server: {
                url: "http://localhost:8080/getClassifications",
                then: data => data.classifications,
                handle: (res) => {
                    if (res.status === 404) return {data: []};
                    if (res.ok) return res.json();
                    throw Error('oh no :(');
                },
            }
        }).render(classificationRef.current)
    },[]);

    return(
        <section className={styles.container}>
            <h1>Page administrateur</h1>
            {openModal != -1 && dialogContainer()}
            <section className={styles.tabcontainer}>
                <div className={styles.align}>
                   <h2>Utilisateurs</h2>
                </div>
                <div className={styles.tables} ref={clientTabRef} />
            </section>
            <section className={styles.tabcontainer}>
                <div className={styles.align}>
                   <h2>Catégorie</h2>
                   <button onClick={()=>setOpenModal(1)}>ajouter une catégorie</button>
                </div>
                <div className={styles.tables} ref={categoryTabRef} />
            </section>
            <section className={styles.tabcontainer}>
                <div className={styles.align}>
                   <h2>Recettes</h2>
                   <Link href={'/dashboard/mes-recettes/edition'}>ajouter une recette</Link>
                </div>
                <div className={styles.tables} ref={recepieTabRef} />
            </section>
            <section className={styles.tabcontainer}>
                <div className={styles.align}>
                   <h2>Classification</h2>
                   <button onClick={()=>setOpenModal(2)}>ajouter une classification</button>
                </div>
                <div className={styles.tables} ref={classificationRef} />
            </section>
        </section>
    )
}