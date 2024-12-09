import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type'; // GraphQL Type for Student
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';
import { StudentConnection } from './models/student-connection.model'; // GraphQL Connection Type for pagination

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  // Create Student
  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  // Get Students with Pagination (Offset and Limit)
  @Query((returns) => StudentConnection)
  async students(
    @Args('limit', { type: () => Number, nullable: true }) limit: number,
    @Args('offset', { type: () => Number, nullable: true }) offset: number,
  ) {
    limit = limit || 10;
    offset = offset || 0;

    return this.studentService.getStudents(limit, offset);
  }

  // Get Student by ID
  @Query((returns) => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }
}
