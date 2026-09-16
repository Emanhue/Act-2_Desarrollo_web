
$(function(){
  // Animación de entrada usando jQuery
  $("main").hide().fadeIn(600);
  $(".card, .hero").each(function(i){
    $(this).css("opacity",0).delay(120*i).animate({opacity:1},450);
  });

  // Resalta automáticamente la página actual
  const actual = location.pathname.split("/").pop() || "index.html";
  $('.nav-link').each(function(){
    if($(this).attr('href')===actual) $(this).addClass('active').attr('aria-current','page');
  });

  // Validación del formulario con JavaScript
  const form=document.getElementById("contactForm");
  if(form){
    form.addEventListener("submit",function(e){
      e.preventDefault();
      e.stopPropagation();
      let valido=true;
      const nombre=document.getElementById("nombre");
      const correo=document.getElementById("correo");
      const motivo=document.getElementById("motivo");
      const mensaje=document.getElementById("mensaje");
      [nombre,correo,motivo,mensaje].forEach(el=>el.classList.remove("is-invalid","is-valid"));
      if(nombre.value.trim().length<3){nombre.classList.add("is-invalid");valido=false}else nombre.classList.add("is-valid");
      const patron=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!patron.test(correo.value.trim())){correo.classList.add("is-invalid");valido=false}else correo.classList.add("is-valid");
      if(!motivo.value){motivo.classList.add("is-invalid");valido=false}else motivo.classList.add("is-valid");
      if(mensaje.value.trim().length<10){mensaje.classList.add("is-invalid");valido=false}else mensaje.classList.add("is-valid");
      const alerta=$("#formAlert");
      if(valido){
        alerta.removeClass("d-none alert-danger").addClass("alert-success").text("Formulario validado correctamente. Este ejercicio es demostrativo y no envía datos a un servidor.").hide().fadeIn(300);
        form.reset();
        [nombre,correo,motivo,mensaje].forEach(el=>el.classList.remove("is-valid"));
      }else{
        alerta.removeClass("d-none alert-success").addClass("alert-danger").text("Revisa los campos marcados antes de enviar.").hide().fadeIn(300);
      }
    });
  }
});
