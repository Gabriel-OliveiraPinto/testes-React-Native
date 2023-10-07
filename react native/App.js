import { React, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, TextInput, Button } from 'react-native';
import axios from 'axios';
export default function App() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => { 
    fetchData();
  }, []);

  const onChangeId = (value) => {
    setId(value);
  }

  const onChangeTitle = (value) => {
    setTitle(value);
  }
  const onChangeContent = (value) => {
    setContent(value);
  }
  const onSubmit = async() => {
    try {
      const response = await axios.post('http://192.168.15.7:3000', {
        id,  
        title,
        content
      })
      console.log(response);
      fetchData();
      setId('');
      setTitle('');
      setContent('');   
    }
    catch (error) {
      alert("An error has occurred");
      
    }
  }

  const onDelete = async() => {
    try{
      console.log(id);
      const response = await axios.delete(`http://192.168.15.7:3000/${id}`);

      console.log(response.data);
      fetchData();
    }
    catch (error) {
      console.error(error);
      alert("An error has occurred");
    }
  }

  const onModify = async() => {
    try{
      const response = await axios.put('http://192.168.15.7:3000', {
        id,  
        title,
        content
      })
      console.log(response.data);
      fetchData();
    }
    catch(error) {
      Alert("An error has occurred");
    }
  }

  const onRefresh = async() => {
    try {
      fetchData()
    } catch(error) {
      console.error(error);
    }
    
  }
  const fetchData = async() => {
    try {
      const response = await axios.get('http://192.168.15.7:3000')
      // console.log(response.data)
      // console.log(response.data[0].title);
      setData(response.data)
    } catch(error) {
      console.error(error);
    }
  }

  
  
  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => console.log(item)}>

            <Text style={styles.title}>{item.id} | {item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Text>{title}</Text>
      
        <TextInput placeholder= 'ID' style={styles.input} value={id} onChangeText={onChangeId}/>
        <TextInput placeholder= 'Title' style={styles.input} value={title} onChangeText={onChangeTitle}/>
        <TextInput placeholder= 'Content' style={styles.input} value={content} onChangeText={onChangeContent}/>
    
      <View style={styles.buttonView}>
        <TouchableOpacity title="Submit" style={[styles.button , {backgroundColor: 'green'}]} onPress={onSubmit}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
        <TouchableOpacity title="Delete" style={[styles.button , {backgroundColor: 'red'}]} onPress={onDelete}><Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
        <TouchableOpacity title="Modify" style={[styles.button , {backgroundColor: 'blue'}]} onPress={onModify}><Text style={styles.buttonText}>Modify</Text></TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  item: { 
    padding: 16, 
    paddingHorizontal: 100,
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
  }, 
  title: { 
    fontWeight: 'bold', 
    fontSize: 18, 
    marginBottom: 8, 
  }, 
  content: { 
    fontSize: 14, 
  }, 
  input: {
    borderWidth: 2,
    borderColor: "grey",
    minWidth: 200,
    textAlignVertical: "center",
    textAlign: 'center',
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 20,
  },
  
  button: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  buttonView: {
    marginTop: 10,
    borderColor: "red",
    flexDirection: 'row', 
    justifyContent: 'space-between'
    
  }
});
