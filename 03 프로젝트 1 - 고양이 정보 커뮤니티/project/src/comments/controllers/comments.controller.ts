import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from '../dtos/comments.create.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentSerivce: CommentsService) {}

  @ApiOperation({
    summary: '모든 고양이 프로필에 적힌 댓글 가져오기',
  })
  @Get()
  async getAllComments() {
    return this.commentSerivce.getAllComments();
  }

  @ApiOperation({
    summary: '특정 고양이 프로필에 댓글 남기기',
  })
  @Post(':id')
  async createComments(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentSerivce.createComment(id, body);
  }

  @ApiOperation({
    summary: '댓글 좋아요 수 올리기',
  })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentSerivce.plusLike(id);
  }
}
