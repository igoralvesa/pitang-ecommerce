import { Link, createFileRoute } from "@tanstack/react-router";

import backgroundSite from "@/assets/background-site.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Button
            variant="ghost"
            className="h-auto px-2 text-base font-semibold tracking-tight text-foreground hover:bg-transparent"
            render={<Link to="/" />}
          >
            Pitang Market
          </Button>
          <nav className="flex items-center gap-3">

            <Button variant="outline" size="sm" render={<Link to="/About" />}>
              Sobre
            </Button>

            <Button variant="default" size="sm" render={<Link to="/login" />}>
              Entrar
            </Button>
          </nav>
        </div>
        <Separator />
      </header>

      <main className="relative flex min-h-0 flex-1 flex-col">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundSite})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/45 to-background/80 dark:from-background/85 dark:via-background/65 dark:to-background/90"
        />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
          <Card
            className={cn(
              "w-full max-w-lg border-border/60 bg-card/85 shadow-lg ring-foreground/10 backdrop-blur-md",
              "dark:bg-card/80",
            )}
          >
            <CardHeader className="gap-3">
              <CardDescription className="text-xs font-medium uppercase tracking-wide">
                E-commerce · compras online
              </CardDescription>
              <CardTitle className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                Tudo o que você precisa, a um clique de distância
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <CardDescription className="text-pretty text-base leading-relaxed">
                O catálogo fica disponível após o login. Crie sua conta ou entre
                para explorar produtos, salvar endereços e acompanhar seus
                pedidos.
              </CardDescription>
            </CardContent>
            <div className="px-6">
              <Separator className="my-6 bg-border/70" />
            </div>
            <CardFooter className="flex flex-col gap-3 pt-0 sm:flex-row sm:justify-start">
              <Button
                className="w-full sm:w-auto"
                size="lg"
                render={<Link to="/register" />}
              >
                Criar conta
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                size="lg"
                render={<Link to="/login" />}
              >
                Já tenho conta
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-background/80">
        <Separator />
        <div className="mx-auto flex max-w-5xl justify-center px-4 py-6 sm:px-6">
          <CardDescription className="text-center text-xs">
            © {new Date().getFullYear()} Pitang Market
          </CardDescription>
        </div>
      </footer>
    </div>
  );
}
