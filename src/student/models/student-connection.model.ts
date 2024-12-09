import { Field, ObjectType } from '@nestjs/graphql';
import { StudentType } from '../student.type';

@ObjectType()
export class StudentEdge {
  @Field(() => StudentType)
  node: StudentType;
}

@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field({ nullable: true })
  startCursor: 'number';

  @Field({ nullable: true })
  endCursor: 'number';
}

@ObjectType()
export class StudentConnection {
  @Field(() => [StudentEdge])
  edges: StudentEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
