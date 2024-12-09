import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  // createStudent
  createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    console.log('ffff');

    return this.studentRepository.save(student);
  }

  // Get Students with Pagination (Offset and Limit)
  async getStudents(limit: number = 10, offset: number = 0): Promise<any> {
    const query = this.studentRepository.createQueryBuilder('student');

    // Apply ordering (necessary for pagination)
    query.orderBy('student.id', 'ASC');

    // Apply limit and offset for pagination
    query.take(limit).skip(offset);

    // Execute the query
    const students = await query.getMany();

    // Return the students and pagination info
    const totalCount = await this.studentRepository.count();

    const hasNextPage = offset + limit < totalCount;
    const hasPreviousPage = offset > 0;
    const startCursor = students.length > 0 ? offset : null;
    const endCursor = students.length > 0 ? offset + students.length - 1 : null;

    return {
      edges: students.map((student) => ({
        node: student,
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
    };
  }

  // getStudentByID
  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }
}
