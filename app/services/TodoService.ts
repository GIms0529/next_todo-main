import axios from 'axios';
import { Todo } from '../models/Todo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default class TodoService {
    static async getTodos() {
        const url = API_URL + "/todos"; // TODO: 実際のAPIエンドポイントに置き換える
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error while fetching todo data:', error);
            throw error;
        }
    }

    static async postTodos(todos: Todo[]) {
        if (!todos || todos.length === 0) return;
        const url = API_URL + "/todos"; // TODO: 実際のAPIエンドポイントに置き換える
        try {
            await axios.post(url, todos);
            // 「data/todo.json」に保存する処理はサーバー側で行われると仮定しています
        } catch (error) {
            console.error('Error while saving todo data:', error);
            throw error;
        }
    }
}
