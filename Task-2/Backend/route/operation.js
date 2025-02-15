const express= require('express');
const mongoose= require('mongoose');
const app= express();
let todo= require('../models/todo')

app.get('/todos', async (req, res) => {
    try {
      const todos = await todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  app.post('/todos', async (req, res) => {
    const { work } = req.body;
    const newTodo = new todo({
      work,
    });
    
    try {
      const savedTodo = await newTodo.save();
      res.json(savedTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.put('/todos/:id', async (req, res) => {
    const { work } = req.body;
    try {
      const updatedTodo = await todo.findByIdAndUpdate(
        req.params.id,
        { work },
        { new: true }
      );
      res.json(updatedTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

  app.delete('/todos/:id', async (req, res) => {
    try {
      await todo.findByIdAndDelete(req.params.id);
      res.json({ message: 'Todo deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  module.exports = app;
