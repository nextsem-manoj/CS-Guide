import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function POST(request: Request) {
  try {
    const { target } = await request.json().catch(() => ({ target: 'production' }));
    const script = target === 'staging' ? 'npm run deploy:staging' : 'npm run deploy:prod';
    
    // Execute production deployment script asynchronously on server
    const { stdout, stderr } = await execPromise(script, {
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer for build output
    });

    return NextResponse.json({
      success: true,
      message: `Successfully deployed to ${target}!`,
      output: stdout,
      errors: stderr,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Deployment failed: ${error.message}`,
      output: error.stdout || '',
      errors: error.stderr || error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
