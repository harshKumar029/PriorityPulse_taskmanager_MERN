import mongoose, { Schema, Document } from 'mongoose';

export interface Todo extends Document {
    title: string;
    description: string;
    completed: boolean;
    date: Date;
}

const TodoSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: Date, required: true }
});

export default mongoose.model<Todo>('Todo', TodoSchema);
