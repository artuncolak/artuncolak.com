/** biome-ignore-all lint/suspicious/noExplicitAny: Generic typography */
import * as React from 'react';
import { cn } from '@/lib/utils';

// Text Component
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
	variant?: 'default' | 'muted' | 'lead' | 'small' | 'large';
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
	({ className, variant = 'default', ...props }, ref) => {
		const variants = {
			default: 'leading-7 [&:not(:first-child)]:mt-6',
			large: 'text-lg font-semibold',
			lead: 'text-xl text-muted-foreground',
			muted: 'text-sm text-muted-foreground',
			small: 'text-sm font-medium leading-none',
		};

		return <p className={cn(variants[variant], className)} ref={ref} {...props} />;
	},
);
Text.displayName = 'Text';

// Heading Component (Polymorphic)
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	level: 1 | 2 | 3 | 4;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
	({ className, level, ...props }, ref) => {
		const variants = {
			1: 'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance',
			2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
			3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
			4: 'scroll-m-20 text-xl font-semibold tracking-tight',
		};

		const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';

		return <Component className={cn(variants[level], className)} ref={ref as any} {...props} />;
	},
);
Heading.displayName = 'Heading';

// Blockquote Component
export interface BlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {}

export const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
	({ className, ...props }, ref) => {
		return (
			<blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} ref={ref} {...props} />
		);
	},
);
Blockquote.displayName = 'Blockquote';

// InlineCode Component
export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {}

export const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
	({ className, ...props }, ref) => {
		return (
			<code
				className={cn(
					'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm',
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
InlineCode.displayName = 'InlineCode';

// List Component
export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
	ordered?: boolean;
}

export const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
	({ className, ordered = false, ...props }, ref) => {
		const Component = ordered ? 'ol' : 'ul';
		const listStyle = ordered ? 'list-decimal' : 'list-disc';

		return (
			<Component
				className={cn('my-6 ml-6', listStyle, '[&>li]:mt-2', className)}
				ref={ref as any}
				{...props}
			/>
		);
	},
);
List.displayName = 'List';
