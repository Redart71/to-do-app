import logo from './Logo.png';
import './App.css';
import "antd/dist/antd.css";
import AddButton from './components/AddButton';
import AddListModal from './components/AddListModal';
import { useEffect, useState } from 'react';
import Fire from "./Fire";
import { Card, Checkbox, Popconfirm, Progress, Spin, BackTop, Space, Input, Tooltip } from 'antd';
import _default from 'rc-trigger';
import UpdateAddListModal from "./components/UpdateAddListModal";
import TasksModal from './components/TasksModal';
import {CloseCircleOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined, SplitCellsOutlined } from '@ant-design/icons';


function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listName, setListName] = useState("");
  const [listColor, setListColor] = useState("");
  const [listTasks, setListTasks] = useState("");
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdateModal, setUpdateModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [isTasksModal, setIsTasksModal] = useState(false);
  const { Search } = Input;
  const [selectedTask, setSelectedTask] = useState(null);
  const onSearch = (value) => {value.target.value !== "" ? setLists(lists.filter(list => list.name.includes(value.target.value))) : setLists(lists) }

  function deleteTask(list, index) {
    const firebase = new Fire ((err) => {
      if(err){
        setError(err);
      }else{
        const newTasks = list.tasks;
        newTasks.splice(index, 1);
        list.tasks= newTasks;
        firebase.updateList(list);
      }
      })
  }


  useEffect(() => {
    const firebase = new Fire((error) => {
      if (error) {
        setError(error);
      }else {
        firebase.getLists(lists => {
          setLists(lists);
          setLoading(false);
        });
      }
      return function unsubscribe(){
        firebase.detach();
      };
    });
  }, []);

  function handleSubmit() {
    const firebase = new Fire ((err) => {
      if (err) {
        setError(err);
      }else{
        const list = {
          "name": listName,
          "color": listColor,
          "tasks": []
        }
        firebase.addList(list);
      }
    })
    setIsModalVisible(false) 
  }

  function updateSubmit(modofier) {
    console.log(modofier);
    const firebase = new Fire ((err) => {
      if(err){
        setError(err);
      }else{
        const list ={
          "id": modofier.id,
          "name": listName,
          "color": listColor,
          "tasks": modofier.tasks,
        }
        firebase.updateList(list);
      }
    })
    setUpdateModal(false);
  }

  function addTask(list) {
    const firebase = new Fire ((err) => {
      if(err){
        setError(err);
      }else{
        const newTasks = list.tasks;
        newTasks.push({
          "title": listTasks, 
          "completed": false,
        })
        firebase.updateList(list);
      }
    })
    setIsTasksModal(false);
  }


  function deleteSubmit(list){
    const firebase = new Fire ((err) =>{
      if (error) {
        setError(error);
      }else{
        firebase.deleteList(list);
      };
    });
  };
  

  function cancel(e) {
    console.log(e);
  }

  function toggleCompleted(task, list) {
    const firebase = new Fire ((err) => {
      if(err){
        setError(err);
      }else{
       list.tasks.find(tache => tache===task).completed =! list.tasks.find(tache => tache===task).completed
        }
        firebase.updateList(list);
      })
  }

  function progress(list) {
    let totalTasks = list.tasks.length;
    let nbCompletedTasks = list.tasks.filter(task => task.completed).length;
    return nbCompletedTasks/totalTasks*100
  }

  /*function onSearch(value) {
    const list = {
      "name": listName,
      "color": listColor,
      "tasks": []
    }
    const firebase = new Fire ((err) => {
      if(err){
        setError(err);
      }else{
        return value = setLists(lists.filter(list => list.name.includes(value)))
        }
        firebase.updateList(list);
      })
  }*/



  return (
    <div className="App">
      <header>
      <BackTop duration="100"
               visibilityHeight="200"
      
      />
        <div className="bar">
          <img src={logo} className="App-logo" alt="logo" />
          <Input type="textarea" style={{width: 200, borderRadius: 20}}  prefix={<SearchOutlined />} suffix={<AddButton icon={<CloseOutlined />} size="small" shape="circle" handleClick={() => window.location.reload()}/>} onPressEnter={() => window.location.reload()} size="large" placeholder="Recherche" onChange={onSearch} ></Input>
          
          <AddButton text = "+ Ajouter une liste"
                    shape = "round"
                    size = "large"
                    type = "primary"
                    handleClick = {() => setIsModalVisible(true)}//si on clique sur le boutton l'etat passe de false à true
                    
          />
         </div>
      </header>
        <div className="cardBody" >
        {loading === true && <Spin className="spin" size="large" />}
        {error !== null && <p>une erreur est survenue</p>}
        {lists.map(list => (
          <Card title={(<>{list.name} <Progress style={{paddingLeft: 140}} type="circle" width="50px" percent={progress(list)} /></>)} className="modalcard" headStyle={{backgroundColor: list.color, borderRadius: 20, display: 'flex', rowGap:'40px'}} style={{ width: 300 }}>
            
            {list.tasks.map((task, index) => (
              
              <div className="d-flex" >
              <Checkbox checked={task.completed} onChange={() => toggleCompleted(task, list)}><p>{task.title}</p></Checkbox>
              <AddButton icon={<DeleteOutlined />} size="small" shape="circle" type="danger" title="Supprimer la tâche" handleClick= {() => deleteTask(list, index)}/>
              </div>
             ))}
              <div className="buttonCard">
                <AddButton
                          title="Modifier la liste"
                          color="blue"
                          shape= "round"
                          icon={<EditOutlined />}
                          handleClick = {() => {
                            setUpdateModal(true);
                            setSelectedList(list);
                            setListName(list.name);
                            setListColor(list.color);
                          }}
                          />
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer votre liste?"
                  onConfirm={() => deleteSubmit(list)}
                  onCancel={cancel}
                  okText="Oui"
                  cancelText="Non"
                  
                >
                  <a href="#">
                    <AddButton icon={<DeleteOutlined />}
                               type= "danger"
                               shape="round"
                               title="Supprimer la liste"
                               color="red"
                               />
                  </a>
                </Popconfirm>
                <AddButton icon={<PlusCircleOutlined style={{color: 'green'}}/>}
                           handleClick = {() =>{
                            setIsTasksModal(true);
                            setSelectedList(list);
                            }}
                            shape="round"
                            title="Ajouter une Tâche"
                            color="green"
                      
                            />
            </div>
          </Card>
        ))}
        </div>
        <section className="section"></section>
          
        <AddListModal
          title="Ajouter une liste"
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}//props pour récupérer l'information du clique sur le bouton ok
          onSubmit={() => setIsModalVisible(false)}//props pour récupérer l'information du clique sur le bouton ok
          changeName={setListName}
          changeColor={setListColor}
          onSubmit={() =>  handleSubmit()}
          
        
        />
        <UpdateAddListModal
          title="Modifiez votre liste"
          visible={isUpdateModal}
          onClose={() => setUpdateModal(false)}//props pour récupérer l'information du clique sur le bouton ok
          onUpdate={() => updateSubmit(selectedList)}//props pour récupérer l'information du clique sur le bouton ok
          changeName={setListName}
          changeColor={setListColor}
          listName={listName}
          listColor={listColor}
        />
        <TasksModal
          title="Ajoutez votre tâche"
          visible={isTasksModal}
          onClose={() => setIsTasksModal(false)}
          onTasks={() => addTask(selectedList)}
          setListTasks={setListTasks}
          listTasks={listTasks}

        />
    </div>
  );
}

export default App;
