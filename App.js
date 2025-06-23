import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';


const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.task}</Text>
  </TouchableOpacity>
);
export default function App() {
  const[userTask, setUserTask]= useState('');
  const[taskLists, setTaskLists] = useState([]);
  const [selectedId, setSelectedId]= useState();
  
  
  const hanldeTaskEntered = (e)=>{
    setTaskLists((currentTasks) =>{
      const newTask = { task: userTask, id: currentTasks.length };
      setUserTask("'");
      return [...currentTasks,newTask];
    });
    
    console.log(taskLists.length);
  }
  const renderItem = ({item})=>{
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';
  
    return <Item  item={item}
          backgroundColor={backgroundColor}
          textColor ={color}
          onPress={()=> setSelectedId(item.id)}

      /> 
  }
  return (
    <View style={styles.mainContainer} >
      <View style={styles.taskContainer}>
        <TextInput  
            placeholder='Enter task' 
            style ={styles.inputContainer}
            value={userTask}
            onChangeText={(changedText)=>{setUserTask(changedText)}}

        />
        <Button title ="Add Task" onPress={hanldeTaskEntered} style={styles.buttonContainer}/>
      </View>
      {taskLists.length >0 &&
        <View style={styles.taskListContainer}>
        
          <FlatList 
            data = {taskLists}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          ></FlatList>
          
        </View>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
      mainContainer :{
        padding : 50,
      
      },
      taskContainer:{
        flexDirection:'row',
       alignItems:'center'
      },
      inputContainer :{
        width:'80%',
        borderColor:'black', 
        borderWidth:1, 
        padding :10,
        marginRight:5,
      },
      buttonContainer :{
      },
      taskListContainer :{
        marginTop:10,
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },

      title: {
        fontSize: 32,
      },
});
