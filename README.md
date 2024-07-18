![image](https://github.com/Manguena/nota20/assets/9891448/8b2f6837-9081-43b4-a1d2-9ad3e6704fc8)
# Nota20 -Sistema de Gestão Académica
 ## Descrição
 Nota20 é um sistema de gestão académica adaptada a realidade moçambicana
 ## Público alvo
 Escolas, universidades e Institutos
 ## Requisitos técnicos
 * [Servidor web + PHP 8+ MySql (de preferencia xampp)](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.1.25/xampp-windows-x64-8.1.25-0-VS16-installer.exe)
 * [Node Js](https://nodejs.org/en)
 * [Composer PHP](https://getcomposer.org/Composer-Setup.exe)
 ## Instalação
 * Crie uma Base de Dados com o nome: nota20
 * Faça Download da a aplicação no formato .zip, a partir do Github
 * Faça extração da pasta nota20 para algum directorio. Por exemplo: E:\
 * Aceda o novo directório  através do CMD (Por exemplo: E:\nota20) e digite o comando:
```
npm install
```
 * Crie uma cópia do ficheiro .env digitando o seguinte comando:
```
cp .env.example .env
```
 * Gere uma chave de encripção através do comando:
```
php artisan migrate
```
 * Migrar a base de dados:
```
php artisan migrate
```
 ## Execute o sistema
 * A partir do directorio que inclui a pasta nota20. Por exemplo: E:\nota20, digite o seguinte comando:
```
   php artisan serve
```
## Preço
 * O sistema é gratuito e não deve ser vendido, senão pelo desenvolver ou com autorização do mesmo
## Contacto
[Jordão Manguena](https://web.facebook.com/TechnoGeekyyy/)

**Atenção**: Ao me contactar posso levar até 3 dias para responder a mensagem
