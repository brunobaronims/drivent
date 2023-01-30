import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";
import dayjs from 'dayjs';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  const formattedCreatedDate = dayjs(createdEnrollment.birthday).toDate();
  const formattedUpdatedData = dayjs(updatedEnrollment.birthday).toDate();

  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: {
      ...createdEnrollment,
      birthday: formattedCreatedDate
    },
    update: {
      ...updatedEnrollment,
      birthday: formattedUpdatedData
    },
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, "id" | "createdAt" | "updatedAt">;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, "userId">;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
};

export default enrollmentRepository;
