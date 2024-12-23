import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Copy, KeyRound } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * PasswordGenerator Component
 * A component that generates secure passwords based on user preferences
 */
export const PasswordGenerator = () => {
	// State to store the generated password
	const [password, setPassword] = useState("");

	// State to manage password length (default: 8 characters)
	const [length, setLength] = useState(8);

	// State to toggle inclusion of numbers in the password
	const [includeNumbers, setIncludeNumbers] = useState(false);

	// State to toggle inclusion of special characters in the password
	const [includeSpecialChars, setIncludeSpecialChars] = useState(false);

	// Ref to store reference to password input for copy functionality
	const passwordRef = useRef<HTMLInputElement>(null);

	/**
	 * Memoized password generation function
	 * Uses useCallback to prevent unnecessary re-renders and
	 * optimize performance by maintaining the same function reference
	 * when dependencies haven't changed
	 */
	const passwordGenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

		if (includeNumbers) str += "0123456789";
		if (includeSpecialChars) str += "!@#$%^&*_+-=|;:,.<>?";

		for (let i = 0; i < length; i++) {
			const char = Math.floor(Math.random() * str.length);
			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [length, includeNumbers, includeSpecialChars, setPassword]);

	/**
	 * Effect hook to generate a new password whenever user preferences change
	 * Runs on component mount and when length, includeNumbers, or includeSpecialChars change
	 */
	useEffect(() => {
		passwordGenerator();
	}, [
		length,
		includeNumbers,
		includeSpecialChars,
		setPassword,
		passwordGenerator,
	]);

	/**
	 * Function to copy generated password to clipboard
	 * Uses the passwordRef to select the input content before copying
	 */
	const copyPasswordToClipboard = () => {
		passwordRef.current?.select();
		passwordRef.current?.setSelectionRange(0, 999);
		navigator.clipboard.writeText(password);
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4 flex items-center">
				<KeyRound className="size-6 mr-2" />
				Password Generator
			</h1>
			<div className="space-y-4">
				<div className="flex space-x-2">
					<Input
						type="text"
						value={password}
						readOnly
						className="flex-grow"
						placeholder="Generated password"
						ref={passwordRef}
					/>
					<Button
						onClick={copyPasswordToClipboard}
						variant="outline"
						size="icon"
						className="p-2"
					>
						<Copy className="size-4" />
					</Button>
				</div>
				<div>
					<Label htmlFor="length-slider">Password Length: {length}</Label>
					<Slider
						id="length-slider"
						min={6}
						max={30}
						step={1}
						value={[length]}
						onValueChange={(value) => setLength(value[0])}
						className="mt-2"
					/>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="include-numbers"
						checked={includeNumbers}
						onCheckedChange={() => setIncludeNumbers((prev) => !prev)}
					/>
					<Label htmlFor="include-numbers">Include Numbers</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="include-special-chars"
						checked={includeSpecialChars}
						onCheckedChange={() => setIncludeSpecialChars((prev) => !prev)}
					/>
					<Label htmlFor="include-special-chars">
						Include Special Characters
					</Label>
				</div>
				<Button
					className="w-full"
					onClick={passwordGenerator}
				>
					Generate Password
				</Button>
			</div>
		</div>
	);
};
