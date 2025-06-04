//Chat.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, ScrollView } from 'react-native';


export default function Chat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');


  const handleSend = async () => {
    try {
      console.log('Enviando pergunta:', input);
      const res = await fetch('http://192.168.0.163:3000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      console.log('Resposta recebida:', data);

      if (data.answer) {
        setResponse(data.answer);
      } else if (data.error) {
        setResponse(`Erro: ${data.details?.error?.message || data.error}`);
      } else {
        setResponse('Sem resposta');
      }
    } catch (err) {
      console.error('Erro ao conectar:', err);
      setResponse('Erro ao conectar com o servidor');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Assistente Virtual com LLM</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua pergunta"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Enviar" onPress={handleSend} />
      <Text style={styles.responseTitle}>Resposta:</Text>
      <Text style={styles.response}>{response}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  responseTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  response: {
    fontSize: 16,
    marginTop: 10,
  },
});
