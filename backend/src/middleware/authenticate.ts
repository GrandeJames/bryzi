import jwt from "jsonwebtoken";

const authenticate = (
  req: { headers: { authorization: string }; user: string | jwt.JwtPayload },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
    };
  },
  next: () => void
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    if (!process.env.AUTH_SECRET) {
      return res.status(500).json({ message: "Internal server error" });
    }
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticate;
