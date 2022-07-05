import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { Socket as SocketModel } from './sockets.model'

const option: SchemaOptions = {
    collection: 'chattings',    // DB collection 명 설정(설정 안하면 class명 소문자, +s로 자동 설정)
    timestamps: true, //updateAt, createAt 자동으로 찍어줌
};

@Schema(option)
export class Chatting extends Document {
    @Prop({
        type: {
            _id: { type: Types.ObjectId, required: true, ref: 'sockets' },
            id: { type: String },
            username: { type: String, required: true }
        },
    })
    @IsNotEmpty()
    @IsString()
    user: SocketModel;

    @Prop({
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    chat: string;
}

export const ChattingSchema = SchemaFactory.createForClass(Chatting);