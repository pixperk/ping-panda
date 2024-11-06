import { PrismaClient } from '@prisma/client/edge'; // Import from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import 'server-only';



// Singleton pattern for creating an accelerated PrismaClient instance.
const createAcceleratedPrismaClient = () => {
	return new PrismaClient({
		log:
			process.env.NODE_ENV === 'development'
				? ['query', 'error', 'warn']
				: ['error'],
	}).$extends(withAccelerate());
};

// Define a type for the accelerated client.
type PrismaClientAccelerated = ReturnType<typeof createAcceleratedPrismaClient>;

const globalForPrisma = globalThis as unknown as {

	acceleratedPrisma: PrismaClientAccelerated | undefined;
};


export const db =
	globalForPrisma.acceleratedPrisma ?? createAcceleratedPrismaClient();

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.acceleratedPrisma = db;
}

