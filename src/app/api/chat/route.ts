import {NextRequest, NextResponse} from 'next/server';
import {chat} from '@/ai/flows/chat-flow';
import {runFlow, StreamingCallback} from 'genkit';

export async function POST(req: NextRequest) {
  try {
    const {message, media} = await req.json();

    if (!message && (!media || media.length === 0)) {
      return NextResponse.json({error: 'Message or media is required'}, {status: 400});
    }

    const chatInput = {
        message: message,
        ...(media && media.length > 0 && {media: media})
    };

    const responseStream = await runFlow(chat, chatInput) as StreamingCallback;

    return new Response(responseStream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
        },
    });

  } catch (error: any) {
    console.error('API route error:', error);
    const errorMessage = error.cause?.message || error.message || 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
